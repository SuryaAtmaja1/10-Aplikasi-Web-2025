import React from "react";
import Image from "next/image";
import EkonomiHeroImg from "../../../../public/assets/category-sajak/ekonomi-hero.svg"
import EkonomiHeroImgMobile from "../../../../public/assets/category-sajak/ekonomi-hero-mobile.svg"

export const EkonomiHero = () => {
  return (
  <div className="relative flex w-full overflow-hidden border-b">
    {/* Desktop */}
    <div className="hidden md:block">
      <Image
        src={EkonomiHeroImg}
        className="w-full"
        width={1920}
        height={800}
        alt="EkonomiHeroImg"
      />
      <div className="h-[100px] px-10">
        <h2 className="font-instrument text-3xl">xxxx sajak, xx penulis</h2>
      </div>
    </div>

    {/* Mobile */}
    <div className="md:hidden w-full">
      <Image
        src={EkonomiHeroImgMobile}
        className="w-full"
        width={360}
        height={240}
        alt="EkonomiHeroImgMobile"
      />
      <div className="h-[100px] px-2">
        <h2 className="font-instrument text-xl">xxxx sajak, xx penulis</h2>
      </div>
    </div>
  </div>
  );
};