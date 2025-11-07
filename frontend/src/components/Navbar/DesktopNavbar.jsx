import React from "react";
import { BsJustify } from "react-icons/bs";
import { CATEGORIES } from "@/data/categories";
import LogoSingkatSajak from "../../../public/assets/LogoSingkatSajak";

const button = (
  <div className="flex justify-center items-center py-3 bg-[#363231] px-6 rounded-[20px] hover:cursor-pointer">
    <div className="text-[#FFF9F4] font-bold text-[16px]">Log In</div>
  </div>
);

export const DesktopNavbar = () => {
  return (
    <div className="w-full ">
      <div className="flex justify-between items-center border-b px-20">
        <BsJustify size={36} className="hover:cursor-pointer" />
        <div className="flex font-playfair justify-center items-center font-bold text-[32px] space-x-4 py-2 hover:cursor-pointer">
          {/* text-[40px] */}
          <div>Singkat</div>
          <LogoSingkatSajak className="text-[#363231] w-10" />
          <div>Sajak</div>
        </div>
        {button}
      </div>
      <div className="flex justify-center items-center border-b">
        <div className="flex justify-center items-center space-x-6 ">
          {CATEGORIES.map((item, index) => (
            <div
              key={index}
              className="flex justify-center px-2 py-3 min-w-40 uppercase text-[16px] font-medium border-b-4 border-transparent hover:cursor-pointer hover:text-[#FA7921] hover:border-[#FA7921] transition-colors duration-200 ease-in-out"
              // text-2xl
            >
              <div>{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
