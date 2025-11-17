import React from "react";

export default function WhiteBox({ isPhone, title, author }) {
  return (
    <div
      className={`
        bg-putih relative flex flex-col justify-between 
        py-1.5 md:py-4 px-1.5 md:px-4 
        hover:-translate-2 hover:shadow-[6px_6px_0_black] active:scale-90 
        transition-all duration-200 overflow-hidden
        ${
          isPhone
            ? "min-w-[115px] min-h-[170px] max-w-[115px]"
            : "min-w-[18vw] min-h-[28vw] max-w-[18vw]"
        }
      `}
    >
      {/* Title */}
      <h1 className="md:text-3xl font-bold text-black whitespace-normal wrap-break-words line-clamp-3">
        {title || ""}
      </h1>

      {/* Author */}
      <h2 className="font-instrument md:text-xl text-black text-ellipsis overflow-hidden whitespace-nowrap">
        {author || ""}
      </h2>
    </div>
  );
}
