import React from "react";
import { useRouter } from "next/navigation";

const FALLBACK = [
  {
    id: 190865938924,
    title: "AKu raja koe rimba",
    author: "NIno Cici EXPLAne",
    createdAt: "2025-09-24T06:34:51.911+00:00",
    content: "Dunia di ambang resesi...",
    image:
      "https://drive.google.com/uc?export=view&id=1d8k1liGU-QGf2VpumqPcsQsVdoObboYi",
    likes: 4,
    commentCount: 123,
  },
  {
    id: 20989079723,
    title: "Keingian main Emel",
    author: "Syahrul Badang Roam",
    createdAt: "2025-09-24T06:34:51.911+00:00",
    content: "Dunia di ambang resesi...",
    image:
      "https://drive.google.com/uc?export=view&id=1d8k1liGU-QGf2VpumqPcsQsVdoObboYi",
    likes: 4,
    commentCount: 123,
  },
];

function normalizeItem(item) {
  if (!item) return null;

  const id = item._id ?? item.id ?? Math.random().toString(36).slice(2);

  // Preferensi:
  // 1) jika CategoryClient sudah menambahkan authorName, pakai itu
  // 2) jika ada field author (string), pakai itu
  // 3) jika authorId adalah object (populated), ambil username/name
  // 4) jika authorId string (id), fallback tampilkan id (atau "-" jika mau)
  let author = "Penulis";
  if (item.authorName) {
    author = item.authorName;
  } else if (typeof item.author === "string" && item.author.trim() !== "") {
    author = item.author;
  } else if (item.authorId && typeof item.authorId === "object") {
    author = item.authorId.username ?? item.authorId.name ?? author;
  } else if (typeof item.authorId === "string") {
    // fallback — ini yang selama ini menyebabkan munculnya id
    author = item.authorId;
  } else if (item.__raw && item.__raw.author) {
    // additional fallback if raw contains author object
    author =
      typeof item.__raw.author === "string"
        ? item.__raw.author
        : item.__raw.author.name ?? author;
  }

  const title =
    item.title ?? (item.content ? item.content.slice(0, 50) : "Tanpa Judul");
  const createdAt =
    item.createdAt ?? item.created_at ?? new Date().toISOString();
  const content = item.content ?? item.body ?? "";
  const image = item.image ?? item.thumbnail ?? "";
  const likes = typeof item.likes === "number" ? item.likes : item.likes ?? 0;
  const commentCount =
    item.commentsCount ?? item.commentCount ?? item.comments?.length ?? 0;
  const hashtags = Array.isArray(item.hashtags) ? item.hashtags : [];

  return {
    id,
    title,
    author,
    createdAt,
    content,
    image,
    likes,
    commentCount,
    hashtags,
    __raw: item,
  };
}

export default function PopularList({
  themeColor,
  trendingList = [],
  loadingTrending = false,
}) {
  const router = useRouter();

  // gunakan trendingList jika tersedia, kalau tidak pakai fallback
  const source =
    Array.isArray(trendingList) && trendingList.length > 0
      ? trendingList
      : FALLBACK;

  return (
    <div className="flex flex-col md:gap-8">
      {source.slice(0, 10).map((rawItem, index) => {
        const item = normalizeItem(rawItem);
        if (!item) return null;

        const displayTitle =
          item.title && item.title.length > 40
            ? item.title.slice(0, 40).trim() + "..."
            : item.title;

        // console.log("🔥 PopularList GUACORR item:", item);
        return (
          <div
            style={{ "--themeColor": themeColor }}
            className="flex items-center gap-7 sm:gap-10 md:gap-14 hover:text-(--themeColor) hover:cursor-pointer"
            key={item.id ?? index}
            onClick={() => {
              // navigasi ke halaman sajak: gunakan hashtag pertama jika ada, fallback "alam"
              const tag = item.hashtags?.[0] ?? "alam";
              router.push(`/sajak/${tag}/${item.id}`);
            }}
          >
            <p className="font-instrument text-[54px] sm:text-[72px] md:text-8xl">
              {String(index + 1).padStart(2, "0")}
            </p>
            <div className="flex flex-col justify-between">
              <p className="font-instrument italic text-[28px] sm:text-[36px] md:text-5xl">
                {displayTitle}
              </p>
              <p className="text-[9px] sm:text-[12px] md:text-[16px]">
                {item.author}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
