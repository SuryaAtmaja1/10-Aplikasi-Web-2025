// components/BoxSajak.jsx
"use client";

import React, { useState } from "react";
import { PiHeart } from "react-icons/pi";
import { FaRegComment, FaArrowRightLong } from "react-icons/fa6";
import { RiShareForwardLine } from "react-icons/ri";

import GDriveImage from "@/components/GDriveImage";
import extractDriveId from "@/components/extractDriverId";
import Link from "next/link";

export default function BoxSajak({ sajak }) {
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0 });

  const date = new Date(sajak.createdAt);
  const dateFormatted = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  const driveThumbnailId = extractDriveId(sajak.image);
  const authorProfileId = sajak.authorProfilePhoto
    ? extractDriveId(sajak.authorProfilePhoto)
    : null;

  const category = sajak.__raw?.hashtags?.[0] || sajak.hashtags?.[0] || "sajak";

  const idForRoute = sajak.id ?? sajak._id ?? "";
  const detailHref = `/sajak/${encodeURIComponent(
    category
  )}/${encodeURIComponent(idForRoute)}`;

  const buildShareUrl = () => {
    const base =
      process.env.DOMAIN_PUBLIC_URL ||
      process.env.NEXT_PUBLIC_BASE_URL ||
      (typeof window !== "undefined" && window.location.origin) ||
      "";

    return `${base.replace(/\/$/, "")}${detailHref}`;
  };

  const handleCopyShare = async (e) => {
    const url = buildShareUrl();

    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }

    // Munculkan tooltip di atas cursor
    setTooltip({
      show: true,
      x: e.clientX,
      y: e.clientY - 30, // naik sedikit
    });

    setTimeout(() => {
      setTooltip((t) => ({ ...t, show: false }));
    }, 1500);
  };

  return (
    <div className="relative">
      {/* Tooltip di atas cursor */}
      {tooltip.show && (
        <div
          className="fixed z-[9999] px-3 py-1 bg-black text-white text-xs rounded-md shadow-md pointer-events-none animate-fade-in"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, -100%)",
          }}
        >
          Tautan disalin!
        </div>
      )}

      {/* CARD */}
      <div className="max-w-full flex p-4 bg-white border items-start border-cerise/25 rounded-[20px] gap-6">
        <div className="flex-shrink-0 w-[160px] sm:w-[200px] md:w-[240px] h-[120px] sm:h-[150px] md:h-[170px] rounded-lg overflow-hidden bg-[#f3f3f3]">
          {driveThumbnailId ? (
            <GDriveImage
              fileId={driveThumbnailId}
              alt={sajak.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={
                sajak.image || "/assets/category-sajak/SajakDefaultPicture.jpg"
              }
              alt={sajak.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="flex flex-col gap-3 flex-1 min-w-0">
          <h3 className="font-instrument text-[16px] sm:text-[20px] md:text-[26px] line-clamp-2">
            {sajak.title}
          </h3>

          {/* AUTHOR */}
          <div className="flex items-center gap-3 text-[11px] sm:text-[12px] md:text-[14px]">
            {authorProfileId ? (
              <GDriveImage
                fileId={authorProfileId}
                alt={sajak.author}
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-[#363231] flex items-center justify-center text-white text-sm">
                {sajak.author?.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="min-w-0">
              <div className="text-sm font-medium text-[#363231] truncate">
                {sajak.author}
              </div>
              <div className="text-xs text-[#6b6b6b]">{dateFormatted}</div>
            </div>
          </div>

          <p className="text-[12px] sm:text-[14px] md:text-[15px] text-[#3a3a3a] line-clamp-4 mt-2">
            {sajak.content?.length > 200
              ? sajak.content.slice(0, 200) + "..."
              : sajak.content}
          </p>

          {/* BUTTONS */}
          <div className="flex justify-between items-center mt-3">
            <div className="flex gap-4 sm:gap-6 items-center">
              <div className="flex items-center gap-2">
                <button className="group text-[18px] md:text-[22px] text-oren hover:bg-oren/10 p-1 rounded-full">
                  <PiHeart />
                </button>
                <span className="text-sm">{sajak.likes}</span>
              </div>

              <div className="flex items-center gap-2">
                <button className="group text-[18px] md:text-[22px] text-oren hover:bg-oren/10 p-1 rounded-full">
                  <FaRegComment />
                </button>
                <span className="text-sm">{sajak.commentCount}</span>
              </div>

              {/* SHARE BUTTON */}
              <button
                onClick={handleCopyShare}
                className="group text-[18px] md:text-[22px] text-oren hover:bg-oren/10 p-1 rounded-full"
              >
                <RiShareForwardLine />
              </button>
            </div>

            <Link href={detailHref} className="ml-4">
              <FaArrowRightLong
                size={25}
                className="text-oren hover:bg-oren/10 p-1 rounded-full"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
