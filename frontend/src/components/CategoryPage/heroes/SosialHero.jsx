import React from "react";
import Image from "next/image";
import SosialHeroImg from "../../../../public/assets/category-sajak/sosial-hero.svg"
import SosialHeroImgMobile from "../../../../public/assets/category-sajak/sosial-hero-mobile.svg"

export const SosialHero = () => {
  return (
  <div className="relative flex w-full overflow-hidden border-b">
    {/* Desktop */}
    <div className="hidden md:block">
      <Image
        src={SosialHeroImg}
        className="w-full"
        width={1920}
        height={800}
        alt="SosialHeroImg"
      />
      <div className="h-[100px] px-10">
        <h2 className="place-self-end font-instrument text-3xl">xxxx sajak, xx penulis</h2>
      </div>
    </div>

    {/* Mobile */}
    <div className="md:hidden w-full">
      <Image
        src={SosialHeroImgMobile}
        className="w-full"
        width={360}
        height={240}
        alt="SosialHeroImgMobile"
      />
      <div className="h-[100px] px-2">
        <h2 className="place-self-end font-instrument text-xl">xxxx sajak, xx penulis</h2>
      </div>
    </div>
  </div>
  );
};