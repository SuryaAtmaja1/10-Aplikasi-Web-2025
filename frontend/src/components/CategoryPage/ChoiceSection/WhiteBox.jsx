import React from "react";

export default function WhiteBox({ isPhone }) {
  return (
    <div
      className={`
        bg-putih text-white flex items-center justify-center shadow font-bold z-50 transform transition duration-200 hover:scale-110 hover:shadow-2xl active:scale-95
        ${isPhone ? "min-w-[115px] min-h-[170px]" : "min-w-[18vw] min-h-[28vw]"}
      `}
    >
      {/* Isi kotak (opsional) */}
    </div>
  );
}
