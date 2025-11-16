import React from "react";
import CategoryButton from "../CategoryButton";

export const LatestContainer = ({ children, themeColor, alterColor }) => {
  return (
    <div className="flex flex-col gap-8 pt-16">
      <h2
        style={{ "--themeColor": themeColor }}
        className="text-[36px] sm:text-[48px] md:text-[64px] underline underline-offset-12 text-(--themeColor)"
      >
        TERBARU
      </h2>
      <div className="flex flex-col gap-4">{children}</div>
      <CategoryButton isResponsive={true} alterColor={alterColor} />
    </div>
  );
};
