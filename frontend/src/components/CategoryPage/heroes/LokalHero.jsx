import React from "react";
import Image from "next/image";
import LokalHeroImage from "../../../../public/assets/category-sajak/lokal-hero.png"

export const LokalHero = () => {
  return (
  <div className="relative flex">
    <Image
      src={LokalHeroImage}
      className="w-full"
      width={1920}
      height={1280}
      alt="LokalHeroImage"
    />
  </div>
  );
};
