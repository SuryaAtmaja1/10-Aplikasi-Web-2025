import React from "react";
import Image from "next/image";
import LokalHeroImage from "../../../../public/assets/category-sajak/lokal-hero.svg"

export const LokalHero = () => {
  return (
  <div className="relative w-full flex flex-col md:flex-row overflow-hidden border-b">
    <Image
      src={LokalHeroImage}
      className="md:w-[71%]"
      width={1403}
      height={935}
      alt="LokalHeroImage"
    />
    <div className="mb-10 mr-4 mt-2 md:absolute bottom-0 right-0 flex flex-col bg-putih">
        <h2 className="font-instrument text-right text-oren text-4xl">xxx sajak</h2>
        <h2 className="font-instrument text-right text-oren text-4xl">xx penulis</h2>
    </div>
  </div>
  );
};
