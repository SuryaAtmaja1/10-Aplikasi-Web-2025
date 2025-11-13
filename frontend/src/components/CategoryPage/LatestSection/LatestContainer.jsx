import React from "react";

export const LatestContainer = ({ children }) => {
  return (
    <div className="flex flex-col gap-8 pl-[4.17vw] pt-16">
      <h2 className="text-[64px] underline underline-offset-12">TERBARU</h2>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
};
