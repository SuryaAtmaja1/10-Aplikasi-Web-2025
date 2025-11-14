import React from "react";
import { CATEGORIES } from "@/data/categories";
import LogoSingkatSajak from "../../../public/assets/LogoSingkatSajak";

const button = (
  <div className="flex justify-center items-center py-3 bg-[#363231] hover:bg-[#4A4442] px-6 rounded-[20px] hover:cursor-pointer">
    <div className="text-[#FFF9F4] font-bold text-[16px]">Log In</div>
  </div>
);

export const DesktopNavbar = React.memo(function DesktopNavbar() {
  return (
    <div className="w-full ">
      <div className="flex justify-between items-center border-b px-20">
        <div></div>
        <div className="flex font-playfair justify-center items-center font-bold text-[32px] space-x-4 py-2 hover:cursor-pointer">
          {/* text-[40px] */}
          <div>Singkat</div>
          <LogoSingkatSajak className="text-[#363231] w-10" />
          <div>Sajak</div>
        </div>
        {button}
      </div>
      <div className="flex justify-center items-center border-b">
        <div className="flex justify-center items-center gap-6">
          {CATEGORIES.map((item, index) => (
            <div
              key={index}
              style={{ paddingInline: "clamp(4px, 2.5vw, 100px)" }}
              className="flex justify-center py-3 uppercase text-[16px] font-medium border-b-4 border-transparent hover:cursor-pointer hover:text-oren hover:border-oren transition-colors duration-200 ease-in-out"
              // text-2xl
            >
              <div>{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
