import React from "react";
import Image from "next/image";
import QuoteLokalImg from "../../../../public/assets/category-sajak/quotes/quote-lokal.svg"
import QuoteLokalImgMobile from "../../../../public/assets/category-sajak/quotes/quote-lokal-mobile.svg"

export const QuoteLokal = () => {
  return (
  <div className="relative flex w-screen overflow-hidden border-b">
    {/* Desktop */}
    <div className="hidden md:block">
      <Image
        src={QuoteLokalImg}
        className="w-full"
        width={1920}
        height={1080}
        alt="QuoteLokalImg"
      />
    </div>

    {/* Mobile */}
    <div className="md:hidden w-full">
      <Image
        src={QuoteLokalImgMobile}
        className="w-full"
        width={360}
        height={520}
        alt="QuoteLokalImgMobile"
      />
    </div>
  </div>
  );
};