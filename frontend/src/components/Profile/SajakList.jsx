"use client";

import React from "react";
import SajakItem from "./SajakItem";

export default function SajakList({ sajaks }) {
  if (!sajaks || sajaks.length === 0) {
    return (
      <div className="text-center text-[#363231] py-12">
        <p className="font-jakarta text-lg">
          Belum ada sajak yang dipublikasikan.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 md:gap-12">
      {sajaks.map((sajak) => (
        <SajakItem key={sajak._id} sajak={sajak} />
      ))}
    </div>
  );
}
