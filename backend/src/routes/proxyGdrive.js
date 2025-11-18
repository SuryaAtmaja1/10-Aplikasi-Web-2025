// routes/proxyGDrive.js
const express = require("express");
const axios = require("axios");
const { Readable } = require("stream");

const router = express.Router();

/**
 * Simple in-memory cache:
 * key -> { buffer: Buffer, headers: {...}, size: number, expiresAt: timestamp }
 */
const cache = new Map();
let cachedBytes = 0;

// Configurable limits
const CACHE_TTL_MS = parseInt(process.env.PROXY_CACHE_TTL_MS || String(1000 * 60 * 5), 10); // 5 minutes default
const MAX_CACHE_BYTES = parseInt(process.env.PROXY_MAX_CACHE_BYTES || String(50 * 1024 * 1024), 10); // 50 MB default
const MAX_CACHE_ITEM_SIZE = parseInt(process.env.PROXY_MAX_CACHE_ITEM_BYTES || String(10 * 1024 * 1024), 10); // 10 MB per item

// Basic drive url builder
function buildDriveUrl(id, confirmToken = null) {
  const base = `https://drive.google.com/uc?export=download&id=${encodeURIComponent(id)}`;
  return confirmToken ? `${base}&confirm=${encodeURIComponent(confirmToken)}` : base;
}

// Validate file id (basic)
function isValidDriveId(id) {
  return typeof id === "string" && /^[a-zA-Z0-9_\-]+$/.test(id) && id.length >= 10;
}

// Remove expired cache entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [k, v] of cache) {
    if (v.expiresAt <= now) {
      cachedBytes -= v.size;
      cache.delete(k);
    }
  }
}, 60 * 1000);

/**
 * Attempt to fetch from Google Drive handling confirm-token flow.
 * Returns { stream, headers }
 */
async function fetchFromDrive(id) {
  const url = buildDriveUrl(id);
  // initial request
  let res;
  try {
    res = await axios.get(url, {
      responseType: "stream",
      // Some sites block unknown user agents — set a common UA
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; ProxyServer/1.0)",
        Accept: "*/*",
      },
      // allow redirects (axios follows by default)
      maxRedirects: 5,
    });
  } catch (err) {
    const status = err.response ? err.response.status : 500;
    throw { code: status, message: "Failed to fetch from Google Drive", raw: err };
  }

  const contentType = (res.headers["content-type"] || "").toLowerCase();

  // If Drive returned an HTML page (possible confirm page for large files),
  // we need to parse the confirm token and re-request with confirm=TOKEN.
  const looksLikeHtml = contentType.includes("text/html") || contentType.includes("application/xhtml+xml");
  if (looksLikeHtml) {
    // buffer small chunk to parse token
    const CHUNK_LIMIT = 128 * 1024; // 128 KB
    const bufs = [];
    let collected = 0;
    for await (const chunk of res.data) {
      bufs.push(chunk);
      collected += chunk.length;
      if (collected >= CHUNK_LIMIT) break;
    }
    const html = Buffer.concat(bufs, collected).toString("utf8");

    // try to find confirm token in HTML with regex
    // Patterns observed: confirm=TOKEN or /uc?export=download&confirm=TOKEN&id=...
    let token = null;
    // common pattern
    const m1 = html.match(/confirm=([0-9A-Za-z_\-]+)&/);
    if (m1) token = m1[1];
    // alternate pattern: value="(TOKEN)" in form
    if (!token) {
      const m2 = html.match(/name="confirm" value="([0-9A-Za-z_\-]+)"/);
      if (m2) token = m2[1];
    }
    // Another fallback: look for /uc?export=download&confirm=XYZ&id=...
    if (!token) {
      const m3 = html.match(/uc\?export=download&amp;confirm=([0-9A-Za-z_\-]+)&amp;id=/);
      if (m3) token = m3[1];
    }

    if (!token) {
      // We couldn't extract token; return error with HTML (useful for debugging)
      const errHtml = html.slice(0, 2000); // limit size
      throw { code: 403, message: "Drive returned an HTML page and token couldn't be parsed", html: errHtml };
    }

    // re-request with token
    const url2 = buildDriveUrl(id, token);
    try {
      const res2 = await axios.get(url2, {
        responseType: "stream",
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; ProxyServer/1.0)",
          Accept: "*/*",
        },
        maxRedirects: 5,
      });
      return { stream: res2.data, headers: res2.headers };
    } catch (err) {
      throw { code: err.response ? err.response.status : 500, message: "Failed to fetch after confirm token", raw: err };
    }
  }

  // Normal file response
  return { stream: res.data, headers: res.headers };
}

/**
 * Cache helper: store buffer if small enough and memory budget allows
 */
function tryCache(id, buffer, headers) {
  const size = buffer.length;
  if (size > MAX_CACHE_ITEM_SIZE) return false;
  if (cachedBytes + size > MAX_CACHE_BYTES) {
    // simple eviction: delete oldest expired ones or clear entirely (simple approach)
    for (const [k, v] of cache) {
      if (v.expiresAt <= Date.now()) {
        cachedBytes -= v.size;
        cache.delete(k);
        if (cachedBytes + size <= MAX_CACHE_BYTES) break;
      }
    }
    if (cachedBytes + size > MAX_CACHE_BYTES) {
      // can't cache due to budget
      return false;
    }
  }
  cache.set(id, {
    buffer,
    headers,
    size,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });
  cachedBytes += size;
  return true;
}

/**
 * GET /gdrive?id=FILE_ID
 * Example: /api/proxy/gdrive?id=1A2b3C...
 */
router.get("/gdrive", async (req, res) => {
  try {
    const id = String(req.query.id || "").trim();
    if (!isValidDriveId(id)) {
      return res.status(400).json({ error: "Invalid or missing id parameter" });
    }

    // Serve from cache if present
    const cached = cache.get(id);
    if (cached && cached.expiresAt > Date.now()) {
      // Serve from buffer
      const headers = cached.headers || {};
      // copy essential headers
      if (headers["content-type"]) res.setHeader("Content-Type", headers["content-type"]);
      if (headers["content-length"]) res.setHeader("Content-Length", String(cached.size));
      // Content-Disposition: keep inline to allow images to show in browser
      if (headers["content-disposition"]) res.setHeader("Content-Disposition", headers["content-disposition"]);
      // set simple client cache
      res.setHeader("Cache-Control", `public, max-age=${Math.round(CACHE_TTL_MS / 1000)}`);
      // Stream buffer
      const stream = Readable.from(cached.buffer);
      stream.pipe(res);
      return;
    }

    // Not cached — fetch from Drive
    const { stream, headers } = await fetchFromDrive(id);

    // Set headers to client (selective)
    const contentType = headers["content-type"] || "application/octet-stream";
    if (contentType) res.setHeader("Content-Type", contentType);
    if (headers["content-length"]) res.setHeader("Content-Length", headers["content-length"]);
    if (headers["content-disposition"]) res.setHeader("Content-Disposition", headers["content-disposition"]);

    // Security: force inline display (images) instead of download by default
    // if you prefer downloading, you can let content-disposition pass or set attachment
    // res.setHeader("Content-Disposition", "inline");

    // Simple caching hint to client
    res.setHeader("Cache-Control", `public, max-age=${Math.round(CACHE_TTL_MS / 1000)}`);

    // Decide whether to cache: only cache if content-length small or unknown but stream small
    const contentLength = headers["content-length"] ? parseInt(headers["content-length"], 10) : NaN;
    if (!Number.isNaN(contentLength) && contentLength <= MAX_CACHE_ITEM_SIZE && contentLength <= (MAX_CACHE_BYTES - cachedBytes)) {
      // buffer entire stream, serve buffer and try to cache
      const bufs = [];
      let total = 0;
      for await (const chunk of stream) {
        bufs.push(chunk);
        total += chunk.length;
        // safety: if exceeds MAX_CACHE_ITEM_SIZE mid-stream, stop caching and pipe remaining directly
        if (total > MAX_CACHE_ITEM_SIZE) {
          // stop buffering and stream remaining data directly (we must re-create stream)
          // NOTE: at this point we already consumed the initial stream; to keep impl simple
          // we will just send what we have and then pipe the rest by re-fetching stream without caching.
          const partial = Buffer.concat(bufs, total);
          res.write(partial);
          // re-fetch and pipe remainder directly (not cached)
          const { stream: directStream } = await fetchFromDrive(id);
          directStream.pipe(res);
          return;
        }
      }
      const fullBuffer = Buffer.concat(bufs, total);
      // try cache
      tryCache(id, fullBuffer, headers);
      // send
      res.end(fullBuffer);
      return;
    } else {
      // Stream directly without buffering (best for large files)
      stream.pipe(res);
      return;
    }
  } catch (err) {
    // handle structured error
    if (err && err.code) {
      const code = err.code >= 400 && err.code < 600 ? err.code : 502;
      // if err.html exists (debug), include short excerpt
      if (err.html) {
        return res.status(code).send(err.html.slice(0, 2000));
      }
      return res.status(code).json({ error: err.message || "Upstream error" });
    }
    console.error("Proxy gdrive error:", err);
    return res.status(500).json({ error: "Internal server error fetching Google Drive file" });
  }
});

module.exports = router;
