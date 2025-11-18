// components/CategoryPage/LatestSection/LatestList.jsx
import React from "react";
import BoxSajak from "../BoxSajak";

// Optional: fallback minimal bila tidak ada data
const FALLBACK = [];

function resolveAuthorFromItem(item) {
  // return { name, profilePhoto }
  if (!item) return { name: "Penulis", profilePhoto: null };

  // 1) Prefer already-attached authorName / authorProfilePhoto
  if (item.authorName || item.authorProfilePhoto) {
    return {
      name: item.authorName ?? item.author ?? "Penulis",
      profilePhoto: item.authorProfilePhoto ?? null,
    };
  }

  // 2) If authorId is populated object, extract
  if (item.authorId && typeof item.authorId === "object") {
    const name =
      item.authorId.username ??
      item.authorId.name ??
      item.authorId.fullname ??
      item.author ??
      "Penulis";
    const profilePhoto =
      item.authorId.profilePhoto ??
      item.authorId.profile_picture ??
      item.authorId.profilePicture ??
      item.authorId.photo ??
      item.authorId.avatar ??
      null;
    return { name, profilePhoto };
  }

  // 3) If author is a string, use it
  if (item.author && typeof item.author === "string") {
    return { name: item.author, profilePhoto: null };
  }

  // 4) If top-level profile fields exist (some APIs put profile on root)
  const profileFromRoot =
    item.profilePhoto ??
    item.profile_picture ??
    item.profilePicture ??
    item.photo ??
    item.avatar ??
    null;
  if (profileFromRoot) {
    const name = item.author ?? item.authorName ?? "Penulis";
    return { name, profilePhoto: profileFromRoot };
  }

  // 5) fallback: if authorId is string, show id (will be resolved elsewhere)
  if (typeof item.authorId === "string") {
    return { name: item.author ?? item.authorId, profilePhoto: null };
  }

  return { name: "Penulis", profilePhoto: null };
}

export default function LatestList({ sajakList }) {
  // support berbagai bentuk: array | { data: [...] } | undefined
  const raw = Array.isArray(sajakList)
    ? sajakList
    : sajakList?.data ?? FALLBACK;

  const normalize = (item) => {
    if (!item) return null;

    // keep original raw for BoxSajak to read hashtags
    const __raw = item.__raw ?? item;

    // prefer _id (API/Mongo) else id else generate
    const id = item._id ?? item.id ?? Math.random().toString(36).slice(2);

    // createdAt normalization
    const createdAt =
      item.createdAt ?? item.created_at ?? new Date().toISOString();

    // resolve author name & profile using helper
    const { name: authorName, profilePhoto: authorProfilePhoto } =
      resolveAuthorFromItem(item);

    return {
      id,
      title: item.title ?? "Tanpa Judul",
      author: authorName,
      createdAt,
      content: item.content ?? item.body ?? "",
      image: item.image ?? item.thumbnail ?? "",
      likes: typeof item.likes === "number" ? item.likes : item.likes ?? 0,
      commentCount:
        item.commentCount ?? item.commentsCount ?? item.comments?.length ?? 0,
      authorName,
      authorProfilePhoto, // may be null
      __raw,
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
          return <BoxSajak key={mapped.id ?? idx} sajak={mapped} />;
        })
      )}
    </div>
  );
}
