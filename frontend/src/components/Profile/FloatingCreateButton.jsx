"use client";

import React from "react";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";

export default function FloatingCreateButton() {
  return (
    <div className="fixed bottom-8 right-4 md:right-8 flex items-center gap-4 z-50">
      <Link href="/sajak/post">
        <button className="w-14 h-14 md:w-16 md:h-16 bg-[#363231] hover:bg-[#4A4442] text-white rounded-full flex items-center justify-center shadow-lg transition-colors shrink-0">
          <FiPlus className="w-7 h-7 md:w-8 md:h-8" />
        </button>
      </Link>
    </div>
  );
}
