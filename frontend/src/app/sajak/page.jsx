// app/sajak/page.jsx (atau pages/sajak/index.jsx)
// Dynamic SajakPage yang tampilannya sama seperti versi statis
"use client";

import React from "react";
import Image from "next/image";
import BoxSajak from "@/components/CategoryPage/BoxSajak"; // gunakan komponen BoxSajak statismu
import api from "@/utils/axiosInstance";
import PageLoading from "@/components/PageLoading";

// --- optional: kalau ingin langsung menampilkan isi statis saat loading (supaya UI tetap konsisten) ---
const STATIC_SAJAK = [
  {
    id: "1",
    title: "AKu raja koe rimba",
    author: "NIno Cici EXPLAne",
    createdAt: "2025-09-24T06:34:51.911+00:00",
    content:
      "Dunia di ambang resesi. Sejumlah pengamat ekonomi, Bank Dunia, maupun Dana Moneter Internasional (IMF) telah melihat potensi ke arah itu...",
    image:
      "https://drive.google.com/uc?export=view&id=1d8k1liGU-QGf2VpumqPcsQsVdoObboYi",
    likes: 4,
    commentCount: 123,
    __raw: null,
  },
  {
    id: "2",
    title: "Keingian main Emel",
    author: "Syahrul Badang Roam",
    createdAt: "2025-09-24T06:34:51.911+00:00",
    content:
      "Dunia di ambang resesi. Sejumlah pengamat ekonomi, Bank Dunia, maupun Dana Moneter Internasional (IMF) telah melihat potensi ke arah itu...",
    image:
      "https://drive.google.com/uc?export=view&id=1d8k1liGU-QGf2VpumqPcsQsVdoObboYi",
    likes: 4,
    commentCount: 123,
    __raw: null,
  },
  // ... bisa tambah hingga beberapa item statis jika perlu
];

// helper: normalisasi item API -> shape yang sama seperti STATIC_SAJAK
function normalizeApiItem(item) {
  if (!item) return null;

  // derive author string (if populated object use username/name, else keep authorId string)
  let authorStr = "Penulis";
  if (item.authorName) authorStr = item.authorName;
  else if (item.author)
    authorStr =
      typeof item.author === "string"
        ? item.author
        : item.author?.name ?? authorStr;
  else if (typeof item.authorId === "string")
    authorStr = item.authorId; // will be replaced by attachAuthor
  else if (typeof item.authorId === "object")
    authorStr = item.authorId.username ?? item.authorId.name ?? "Penulis";

  return {
    id: item._id ?? item.id ?? String(Math.random().toString(36).slice(2)),
    title: item.title ?? "Tanpa Judul",
    author: authorStr,
    createdAt: item.createdAt ?? item.created_at ?? new Date().toISOString(),
    content: item.content ?? item.body ?? "",
    image: item.image ?? item.thumbnail ?? "",
    likes: typeof item.likes === "number" ? item.likes : item.likes ?? 0,
    commentCount:
      item.commentsCount ?? item.commentCount ?? item.comments?.length ?? 0,
    __raw: item,
  };
}

export default function SajakPage() {
  // start with static list so UI matches immediately
  const [sajakList, setSajakList] = React.useState(STATIC_SAJAK);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // cache for fetched users to resolve author names & profile photo
  const userCacheRef = React.useRef({}); // { [id]: userObject | null }

  // fetch user and cache
  async function fetchUserAndCache(id) {
    if (!id) return null;
    if (userCacheRef.current[id] !== undefined) return userCacheRef.current[id];
    try {
      const res = await api.get(`/user/${id}`);
      const payload = res.data?.data ?? res.data ?? null;
      userCacheRef.current[id] = payload;
      return payload;
    } catch (err) {
      console.error("fetch user failed", id, err);
      userCacheRef.current[id] = null;
      return null;
    }
  }

  // resolve author names + profile photo for normalized items (if authorId present)
  async function attachAuthors(normalizedItems, mounted) {
    // collect unique authorId strings from __raw.authorId
    const ids = Array.from(
      new Set(
        normalizedItems
          .map((it) => {
            const raw = it.__raw ?? {};
            const a = raw.authorId ?? raw.author ?? null;
            return typeof a === "string" ? a : null;
          })
          .filter(Boolean)
      )
    );

    // fetch missing users in parallel
    const toFetch = ids.filter((id) => userCacheRef.current[id] === undefined);
    if (toFetch.length > 0) {
      await Promise.all(toFetch.map((id) => fetchUserAndCache(id)));
      if (!mounted) return normalizedItems;
    }

    // map & attach
    return normalizedItems.map((it) => {
      const raw = it.__raw ?? {};
      const authorIdStr =
        typeof raw.authorId === "string" ? raw.authorId : null;
      const cached = authorIdStr ? userCacheRef.current[authorIdStr] : null;

      const authorName =
        cached?.username ??
        cached?.name ??
        it.author ??
        authorIdStr ??
        "Penulis";

      return {
        ...it,
        author: authorName,
        // store original profile photo URL (backend field name might be profilePhoto or photo)
        authorProfilePhoto:
          cached?.profilePhoto ??
          cached?.profilePicture ??
          cached?.photo ??
          null,
      };
    });
  }

  React.useEffect(() => {
    let mounted = true;

    async function loadTrending() {
      try {
        setLoading(true);
        setError(null);

        const res = await api.get("/sajak/recent");
        const arr =
          (res.data?.data && Array.isArray(res.data.data) && res.data.data) ||
          (Array.isArray(res.data) && res.data) ||
          [];

        if (!mounted) return;

        const normalized = arr.map(normalizeApiItem).filter(Boolean);

        // attach authors
        const withAuthors = await attachAuthors(normalized, mounted);
        if (!mounted) return;

        // final: if API returned items use them (limit 10), otherwise keep static
        if (withAuthors.length > 0) {
          setSajakList(withAuthors.slice(0, 10));
        } else {
          // keep STATIC_SAJAK (already set), but ensure length <= 10
          setSajakList(STATIC_SAJAK.slice(0, 10));
        }
      } catch (err) {
        console.error("fetch trending failed", err);
        if (mounted) {
          setError(
            "Gagal mengambil data trending — menampilkan konten statis."
          );
          setSajakList(STATIC_SAJAK.slice(0, 10));
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadTrending();
    return () => {
      mounted = false;
    };
  }, []);

  // --- RENDER: use the *same markup* as versi statis supaya desain identik ---
  return (
    <main className="w-[88.889vw] md:w-[75.833vw] mx-auto pt-8 pb-20">
      <div className="relative w-full mb-8 md:mb-12">
        {/* garis kuning atas */}
        <div className="absolute h-[10px] md:h-[16px] bg-[#F9D949] left-[0.5%] w-[85%] top-[31%] md:top-[30%] z-0 opacity-70"></div>

        {/* garis kuning bawah */}
        <div className="absolute h-[10px] md:h-[16px] bg-[#F9D949] right-0 w-[48%] md:w-[69%] top-[83%] md:top-[82%] z-0 opacity-70"></div>

        <div className="relative z-10 grid grid-cols-2 gap-x-4 md:gap-x-8 items-center">
          {/* baris 1 kiri - enjoy reading */}
          <div className="text-left">
            <h1 className="text-4xl md:text-7xl font-jakarta font-extrabold text-oren">
              Enjoy Reading
            </h1>
          </div>

          {/* baris 1 kanan - gambar org */}
          <div className="w-full flex justify-end my-4 md:my-0 relative top-2 md:top-0">
            <Image
              src="/people.svg"
              alt="enjoy reading"
              width={100}
              height={50}
              className="md:w-[250px] md:h-[125px] relative bottom-2 right-20 md:right-40"
            />
          </div>

          <div className="col-span-2 grid grid-cols-2 md:grid-cols-10 gap-x-4 md:gap-x-8 items-center mt-2">
            {/* baris 2 kiri - search bar */}
            <div className="relative w-full max-w-lg md:mx-0 md:col-span-3">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ABABAB] z-10">
                <Image
                  src="/search-icon.svg"
                  alt="search"
                  width={20}
                  height={20}
                />
              </span>

              <input
                type="search"
                placeholder="Search here"
                className="relative w-full pl-12 pr-4 py-3 font-jakarta border border-[#B5B5B5] rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            {/* baris 2 kanan - our sajak */}
            <div className="text-left md:col-span-7">
              <h2 className="text-4xl md:text-7xl font-jakarta font-extrabold text-oren">
                Our Sajak.
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* daftar sajak -> gunakan layout identik dengan versi statis */}
      <div className="flex flex-col gap-6">
        {loading ? (
          <div className="text-center py-8">
            <PageLoading message="Memuat laman..." />
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-8">{error}</div>
        ) : sajakList.length === 0 ? (
          <div className="text-center text-black py-8">
            Tidak ada sajak untuk ditampilkan.
          </div>
        ) : (
          // IMPORTANT: mapping exactly the same as statis version
          sajakList
            .slice(0, 10)
            .map((item) => <BoxSajak key={item.id} sajak={item} />)
        )}
      </div>
    </main>
  );
}
