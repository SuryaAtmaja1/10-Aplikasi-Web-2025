"use client";

import React from "react";
import Link from "next/link";

function formatDateShort(dateString) {
  const date = new Date(dateString);
  const months = [
    "Januari","Februari","Maret","April","Mei","Juni",
    "Juli","Agustus","September","Oktober","November","Desember",
  ];
  return `${date.getDate().toString().padStart(2, "0")} ${months[date.getMonth()]}`;
}

export default function SajakItem({ sajak, onDelete, onLike }) {
  // onDelete(id) and onLike(id, newLikes) are provided by parent
  return (
    <article className="flex flex-col">
      <div className="flex items-start justify-between gap-3 md:gap-6 mb-4 md:mb-6">
        <h3 className="font-instrument font-normal text-4xl md:text-5xl text-[#363231] flex-1 leading-tight">
          {sajak.title}
        </h3>

        <div className="flex gap-3 shrink-0 pt-2">
          <Link href={`/sajak/edit/${sajak._id}`}>
            <button
              className="text-[#363231] hover:text-oren transition-all duration-200 p-1 hover:scale-110 active:scale-95 rounded-md hover:bg-oren/10"
              aria-label="Edit sajak"
            >
              {/* edit svg */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
          </Link>

          <button
            onClick={() => onDelete(sajak._id)}
            className="text-[#363231] hover:text-cerise transition-all duration-200 p-1 hover:scale-110 active:scale-95 rounded-md hover:bg-cerise/10"
            aria-label="Delete sajak"
          >
            {/* delete svg */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>

      <p className="font-jakarta text-base md:text-lg leading-relaxed text-[#363231] mb-4 md:mb-6">
        {sajak.content?.length > 150
          ? `${sajak.content.substring(0, 150)}...`
          : sajak.content}
      </p>

      <div className="flex items-center gap-4 md:gap-8 text-[#363231]">
        <div className="flex items-center gap-2 md:gap-3">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span className="text-sm md:text-base font-jakarta">
            {formatDateShort(sajak.createdAt)}
          </span>
        </div>

        <Link href={`/sajak/${sajak.hashtags[0]}/${sajak._id}#comments`}>
          <button className="flex items-center gap-2 md:gap-3 text-[#363231] hover:text-biru transition-all">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>{sajak.commentsCount ?? (sajak.comments?.length ?? 0)}</span>
          </button>
        </Link>

        <button
          onClick={() => onLike?.(sajak._id)}
          className="flex items-center gap-2 md:gap-3 transition-all duration-200 hover:scale-110 active:scale-95 rounded-md px-1 py-0.5"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={sajak.likedByUser ? "red" : "none"} // isi merah kalau sudah like
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-all duration-200 ${
              sajak.likedByUser ? "stroke-red-500" : "stroke-current"
            }`}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <span className="text-sm md:text-base font-jakarta font-normal">
            {sajak.likes || 0}
          </span>
        </button>
      </div>
    </article>
  );
}
