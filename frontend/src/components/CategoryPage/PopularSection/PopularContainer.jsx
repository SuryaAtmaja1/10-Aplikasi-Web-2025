import React from "react";

export default function PopularContainer({ children }) {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 md:pt-6 lg:pt-16">
      <h2 className="text-[36px] sm:text-[48px] md:text-[64px] font-instrument underline underline-offset-12 text-left md:text-center lg:text-left">
        TERPOPULER
      </h2>
      {children}
    </div>
  );
}
