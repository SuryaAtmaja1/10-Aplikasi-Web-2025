"use client";

import React from "react";
import SajakItem from "./SajakItem";

/**
 * props:
 * - sajaks: array
 * - onDelete: function(id) -> should call backend and update state in parent OR parent can pass setSajaks
 * - onLike: function(id) -> parent handles API + state
 *
 * In our integration below, parent (ProfilePage) will pass onDelete and onLike.
 */

export default function SajakList({ sajaks = [], onDelete, onLike }) {
  const safeSajaks = Array.isArray(sajaks) ? sajaks.filter((s) => s && s._id) : [];

  if (safeSajaks.length === 0) {
    return (
      <div className="text-center text-[#363231] py-12">
        <p className="font-jakarta text-lg">Belum ada sajak yang dipublikasikan.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 md:gap-12">
      {safeSajaks.map((sajak) => (
        <SajakItem
          key={sajak._id}
          sajak={sajak}
          onDelete={onDelete}
          onLike={onLike}
        />
      ))}
    </div>
  );
}
