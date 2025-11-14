import React from "react";
import Image from "next/image";
import { PiHeart } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { RiShareForwardLine } from "react-icons/ri";

export default function BoxSajak({ sajak }) {
  const dateString = sajak.createdAt;
  const date = new Date(dateString);

  const dateFormatted = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
  return (
    <div className="max-w-full flex p-4 bg-white border items-center border-cerise/25 rounded-[20px] gap-10">
      <div className="min-w-[120px] sm:min-w-40 md:min-w-[20vw] h-36 sm:h-[200px] overflow-hidden rounded-lg relative">
        <Image
          src="/assets/category-sajak/SajakDefaultPicture.jpg"
          alt="Sajak Picture"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-3 flex-initial">
        <h3 className="font-instrument text-[16px] sm:text-[24px] md:text-[32px] flex-none">
          {sajak.title}
        </h3>
        <div className="flex gap-4 items-center text-[8px] sm:text-[10px] md:text-[12px] flex-none">
          <div className="w-3 sm:w-5 md:w-6 h-3 sm:h-5 md:h-6 rounded-full bg-amber-800"></div>
          <div>{sajak.author}</div>
          <div className="flex gap-1 ">
            <div className="min-h-full min-w-px bg-[#363231] "></div>
            <div className="">{dateFormatted}</div>
          </div>
        </div>
        <p className="flex-1 text-[10px] sm:text-[14px] md:text-[16px]">
          {sajak.content.length > 200
            ? sajak.content.slice(0, 200) + "..."
            : sajak.content}
        </p>
        <div className="flex justify-between items-center flex-none">
          <div className="flex gap-3 sm:gap-6 items-center">
            <div className="flex gap-1.5 sm:gap-3 items-center">
              <div className="group text-[16px] md:text-[24px] text-oren bg-transparent hover:bg-oren/10 p-1 rounded-full transition duration-200 ease-in-out hover:scale-110">
                <PiHeart
                  className="h-full w-full transition-colors duration-200"
                  style={{ fill: "currentColor" }}
                />
              </div>
              <p className="text-[10px] sm:text-[16px]">{sajak.likes}</p>
            </div>
            <div className="flex gap-1.5 sm:gap-3 items-center">
              <div className="group text-[16px] md:text-[24px] text-oren bg-transparent hover:bg-oren/10 p-1 rounded-full transition duration-200 ease-in-out hover:scale-110">
                <FaRegComment
                  className="h-full w-full transition-colors duration-200"
                  style={{ fill: "currentColor" }}
                />
              </div>
              <p className="text-[10px] sm:text-[16px]">{sajak.commentCount}</p>
            </div>
            <div className="group text-[16px] md:text-[24px] text-oren bg-transparent hover:bg-oren/10 p-1 rounded-full transition duration-200 ease-in-out hover:scale-110">
              <RiShareForwardLine
                className="h-full w-full transition-colors duration-200"
                style={{ fill: "currentColor" }}
              />
            </div>
          </div>
          <FaArrowRightLong
            size={25}
            className="text-oren transition duration-200 ease-in-out hover:scale-110 hover:bg-oren/10 p-1 rounded-full"
            style={{ fill: "currentColor" }}
          />
        </div>
      </div>
    </div>
  );
}
