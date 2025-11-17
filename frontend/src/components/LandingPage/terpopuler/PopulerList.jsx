import React from "react";
import Image from "next/image";
import WhiteBox from "@/components/CategoryPage/ChoiceSection/WhiteBox";
import RomanBath from "../../../../public/assets/landing/roman_bath.png"

export default function PopulerList() {
  return (
    <div className="w-full flex flex-col items-center md:flex-row md:justify-center gap-6">
      <Image
        src={RomanBath}
        className="absolute mt-[15vh] md:mt-0 [clip-path:polygon(0%_22%,100%_22%,100%_78%,0%_78%)] opacity-67 transform transition duration-500"
        width={1920}
        height={704}
        alt="RomanBath"
      />

      <div className="md:hidden flex flex-col items-center gap-7">
        <WhiteBox isPhone={true} />
        <div className="flex flex-row justify-center gap-12">
          <WhiteBox isPhone={true} />
          <WhiteBox isPhone={true} />
        </div>
      </div>
      <div className="hidden md:flex flex-row gap-20">
        <WhiteBox isPhone={false} />
        <WhiteBox isPhone={false} />
        <WhiteBox isPhone={false} />
      </div>
    </div>
  );
}
