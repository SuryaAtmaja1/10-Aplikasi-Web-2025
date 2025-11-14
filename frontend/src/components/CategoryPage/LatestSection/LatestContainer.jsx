import React from "react";

export const LatestContainer = ({ children }) => {
  return (
    <div className="flex flex-col gap-8 pt-16">
      <h2 className="text-[36px] sm:text-[48px] md:text-[64px] underline underline-offset-12">
        TERBARU
      </h2>
      <div className="flex  flex-col gap-4">{children}</div>
    </div>
  );
};
