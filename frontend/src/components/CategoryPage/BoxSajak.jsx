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
    <div className="max-w-full flex p-4 bg-white border border-[#D1345B]/25 rounded-[20px] gap-10">
      <div className="shrink-0 w-[320px]">
        <Image
          src="/assets/category-sajak/SajakDefaultPicture.jpg"
          width={320}
          height={168}
          alt="Sajak Picture"
        />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="font-instrument text-[32px] flex-none">{sajak.title}</h3>
        <div className="flex gap-4 items-center text-[12px] flex-none">
          <div className="w-6 h-6 rounded-full bg-amber-800"></div>
          <div>{sajak.author}</div>
          <div className="flex gap-1 ">
            <div className="min-h-full w-px bg-[#363231] "></div>
            <div className="">{dateFormatted}</div>
          </div>
        </div>
        <p className="flex-1">
          {sajak.content.length > 200
            ? sajak.content.slice(0, 200) + "..."
            : sajak.content}
        </p>
        <div className="flex justify-between items-center flex-none">
          <div className="flex gap-6 items-center">
            <div className="flex gap-3 items-center">
              <PiHeart color="#fa7921" size={20} />
              <p>{sajak.likes}</p>
            </div>
            <div className="flex gap-3 items-center">
              <FaRegComment color="#fa7921" size={20} />
              <p>{sajak.commentCount}</p>
            </div>
            <RiShareForwardLine color="#fa7921" size={25} />
          </div>
          <FaArrowRightLong color="#fa7921" size={25} />
        </div>
      </div>
    </div>
  );
}
