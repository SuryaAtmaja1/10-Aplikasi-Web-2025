import React from "react";
import { BsArrowRightCircle } from "react-icons/bs";

export default function CategoryButton({ isResponsive, alterColor }) {
  return (
    <div
      style={{ "--alterColor": alterColor }}
      className={`flex items-center bg-(--alterColor) hover:cursor-pointer hover:brightness-70 transition duration-200 text-putih px-[18px] py-2 ${
        isResponsive
          ? "rounded-[10px] sm:rounded-2xl sm:self-end gap-3.5 justify-center"
          : "rounded-2xl self-end gap-3.5"
      }`}
    >
      <div className="flex items-center">
        <p className="font-extrabold text-[10px] sm:text-[15px] md:text-[20px] underline">
          lihat semua
        </p>
      </div>
      <div className="text-2xl sm:text-3xl md:text-[40px]">
        <BsArrowRightCircle />
      </div>
    </div>
  );
}
