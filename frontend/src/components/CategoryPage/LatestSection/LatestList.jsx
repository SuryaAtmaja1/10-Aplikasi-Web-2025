import React from "react";
import BoxSajak from "../BoxSajak";

// Optional: fallback minimal bila tidak ada data
const FALLBACK = [];

export default function LatestList({ sajakList }) {
  // support berbagai bentuk: array | { data: [...] } | undefined
  const raw = Array.isArray(sajakList)
    ? sajakList
    : sajakList?.data ?? FALLBACK;

  // console.log("🔥 LatestList menerima data (normalized):", raw);

  // normalize tiap item ke bentuk yang BoxSajak lebih mungkin harapkan
  const normalize = (item) => {
    if (!item) return null;

    // Jika item sudah menggunakan struktur mockmu (id numeric)
    if (item.id || typeof item._id === "undefined") {
      return {
        id: item.id ?? item._id ?? Math.random().toString(36).slice(2),
        title: item.title,
        author:
          item.author ?? item.authorId?.username ?? item.authorId ?? "Penulis",
        createdAt: item.createdAt ?? item.created_at ?? item.createdAt,
        content: item.content ?? item.body ?? "",
        image: item.image ?? "",
        likes: item.likes ?? 0,
        commentCount:
          item.commentCount ?? item.commentsCount ?? item.comments?.length ?? 0,
        __raw: item,
      };
    }

    // Jika item dari API (Mongo style) biasanya punya _id, authorId, etc.
    return {
      id: item._id ?? item.id ?? Math.random().toString(36).slice(2),
      title: item.title ?? "Tanpa Judul",
      author:
        typeof item.authorId === "string"
          ? item.authorId
          : item.authorId?.username ?? item.authorId?.name ?? "Penulis",
      createdAt: item.createdAt ?? item.created_at ?? new Date().toISOString(),
      content: item.content ?? item.body ?? "",
      image: item.image ?? item.thumbnail ?? "",
      likes: typeof item.likes === "number" ? item.likes : item.likes ?? 0,
      commentCount:
        item.commentsCount ?? item.commentCount ?? item.comments?.length ?? 0,
      __raw: item,
    };
  };

  const list = Array.isArray(raw) ? raw : [];

  return (
    <div className="space-y-8">
      {list.length === 0 ? (
        <div> Tidak ada sajak</div>
      ) : (
        list.slice(0, 5).map((item, idx) => {
          const mapped = normalize(item);
          if (!mapped) return null;
          // gunakan mapped.id (fallback ke index jika perlu)
          return <BoxSajak key={mapped.id ?? idx} sajak={mapped} />;
        })
      )}
    </div>
  );
}
