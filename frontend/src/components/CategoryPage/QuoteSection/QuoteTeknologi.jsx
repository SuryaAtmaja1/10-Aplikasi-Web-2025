import React from "react";
import Image from "next/image";
import QuoteTeknologiImg from "../../../../public/assets/category-sajak/quotes/quote-tech.svg"
import QuoteTeknologiImgMobile from "../../../../public/assets/category-sajak/quotes/quote-tech-mobile.svg"

export const QuoteTeknologi = () => {
  return (
  <div className="relative flex w-screen overflow-hidden border-b">
    {/* Desktop */}
    <div className="hidden md:block">
      <Image
        src={QuoteTeknologiImg}
        className="w-full"
        width={1920}
        height={1080}
        alt="QuoteTeknologiImg"
      />
    </div>

    {/* Mobile */}
    <div className="md:hidden w-full">
      <Image
        src={QuoteTeknologiImgMobile}
        className="w-full"
        width={360}
        height={520}
        alt="QuoteTeknologiImgMobile"
      />
    </div>
  </div>
  );
};