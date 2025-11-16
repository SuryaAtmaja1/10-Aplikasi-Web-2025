import React from "react";
import Image from "next/image";
import PolitikHeroImg from "../../../../public/assets/category-sajak/politik-hero.svg"

export const PolitikHero = () => {
  return (
  <div className="relative flex w-screen overflow-hidden border-b">
    {/* Desktop */}
    <div className="mt-2">
      <Image
        src={PolitikHeroImg}
        className="w-screen md:w-full rotate-20 md:rotate-0 mt-16 md:mt-0 transform transition duration-700 scale-125 hover:scale-120 active:scale-x-150"
        width={1920}
        height={800}
        alt="PolitikHeroImg"
        oncontextmenu="return false;"
      />
      <div className="h-fit px-4 md:px-16 mt-7 md:mt-0">
        <h1 className="font-jakarta font-semibold text-5xl md:text-9xl mb-2 md:mb-5">politik.</h1>
        <h2 className="font-instrument text-lg md:text-3xl ml-0.5 md:ml-2 mb-24">xxxx sajak, xx penulis</h2>
      </div>
    </div>
  </div>
  );
};