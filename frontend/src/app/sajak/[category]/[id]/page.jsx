"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PiHeart, PiHeartFill } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa6";
import { RiShareForwardLine } from "react-icons/ri";
import Comments from "@/components/SajakPage/Comments";

export default function ArticlePage() {
  const router = useRouter();

  /* LIKE STATE */
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(100);

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => prev + (liked ? -1 : 1));
  };

  /* COMMENT INPUT */
  const [comment, setComment] = useState("");

  const sendComment = () => {
    if (!comment.trim()) return;
    console.log("SEND COMMENT:", comment);
    setComment("");
  };

  /* REPLY STATE */
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const handleReply = (id) => {
    setReplyingTo(id);
    setReplyText("");
  };

  const cancelReply = () => {
    setReplyingTo(null);
    setReplyText("");
  };

  const sendReply = (commentId) => {
    if (!replyText.trim()) return;
    console.log("SEND REPLY TO:", commentId, "TEXT:", replyText);
    setReplyText("");
    setReplyingTo(null);
  };

  return (
    <main className="w-full min-h-screen px-4 md:px-8 lg:px-24 py-10 bg-background text-foreground">

      {/* BREADCRUMB — clickable category */}
      <p
        className="text-xs tracking-wide text-hitam uppercase mb-4 cursor-pointer"
        onClick={() => router.push("/sajak/alam")}
      >
        LOKAL | ALAM | INI TAG KATEGORI NYA MWAH
      </p>

      {/* TITLE — go to sajak */}
      <h1
        className="font-playfair text-3xl md:text-4xl font-semibold leading-tight mb-4 cursor-pointer"
        onClick={() => router.push("/sajak/123")}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </h1>

      {/* AUTHOR */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <div className="cursor-pointer" onClick={() => router.push("/profil/author123")}>
          <DefaultProfile size={22} />
        </div>

        <p
          className="cursor-pointer"
          onClick={() => router.push("/profil/author123")}
        >
          hai ini nama author | 22 November 2025
        </p>
      </div>

      {/* THUMBNAIL — go to sajak */}
      <div
        className="relative w-full aspect-[1746/605] mb-10 cursor-pointer"
        onClick={() => router.push("/sajak/123")}
      >
        <Image
          src="/assets/category-sajak/SajakDefaultPicture.jpg"
          alt="thumbnail"
          fill
          className="object-cover"
        />
      </div>

      {/* ARTICLE + SIDEBAR */}
      <section className="hidden lg:grid grid-cols-4 gap-10">
        <div className="col-span-3 space-y-6 leading-relaxed text-[15px]">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
          <p>Quisque sagittis orci ut diam condimentum...</p>
        </div>

        <aside className="col-span-1">
          <SidebarPopular />
        </aside>
      </section>

      {/* MOBILE ARTICLE */}
      <section className="lg:hidden space-y-6 leading-relaxed text-[15px] mb-10">
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Quisque sagittis orci...</p>
      </section>

      {/* Likes */}
      <div className="flex items-center gap-6 my-10 text-sm">

        {/* LIKE */}
        <button onClick={toggleLike} className="flex items-center gap-1">
          {liked ? (
            <PiHeartFill className="text-oren w-[22px] h-[22px]" />
          ) : (
            <PiHeart className="text-oren w-[22px] h-[22px]" />
          )}
          <span>{likeCount}</span>
        </button>

        {/* COMMENT ICON */}
        <div className="flex items-center gap-1 cursor-pointer">
          <FaRegComment className="text-oren w-[22px] h-[22px]" />
          <span>100</span>
        </div>

        {/* SHARE (belum dihubungkan) */}
        <div className="flex items-center gap-1 cursor-pointer">
          <RiShareForwardLine className="text-oren w-[22px] h-[22px]" />
        </div>
      </div>

      {/* COMMENTS */}
       <Comments initialCount={70} />

      {/* SIDEBAR MOBILE */}
      <div className="mt-12 lg:hidden">
        <SidebarPopular />
      </div>
    </main>
  );
}

/* ================= SIDEBAR ================== */
function SidebarPopular() {
  const router = useRouter();

  return (
    <>
      <h3 className="font-playfair text-xs tracking-wider mb-4">
        SAJAK TERPOPULER
      </h3>

      <div className="space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex gap-3 border-b pb-3 cursor-pointer"
            onClick={() => router.push(`/sajak/popular-${i}`)}
          >
            <div className="relative w-20 aspect-[1746/605]">
              <Image
                src="/assets/category-sajak/SajakDefaultPicture.jpg"
                alt="popular"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p
                className="text-[11px] uppercase mb-1 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/kategori/tag-${i}`);
                }}
              >
                TAG NYA
              </p>

              <p className="text-sm leading-snug">
                Lorem ipsum dolor sit amet...
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ================= PROFILE ICON =============== */
function DefaultProfile({ size = 24 }) {
  return (
    <div
      className="rounded-full bg-[#363231] flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        className="text-[#FFF9F4]"
        fill="currentColor"
        viewBox="0 0 20 20"
        width={size * 0.6}
        height={size * 0.6}
      >
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0A7 7 0 013 16z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}