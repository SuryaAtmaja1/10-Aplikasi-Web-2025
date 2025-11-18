import React from "react";
import Image from "next/image";
import QuoteEkonomiImg from "../../../../public/assets/category-sajak/quotes/quote-ekonomi.svg"
import QuoteEkonomiImgMobile from "../../../../public/assets/category-sajak/quotes/quote-ekonomi-mobile.svg"

export const QuoteEkonomi = () => {
  return (
  <div className="relative w-full overflow-hidden border-b">
    {/* Desktop */}
    <div className="hidden md:block">
      <Image
        src={QuoteEkonomiImg}
        className="w-full"
        width={1920}
        height={1080}
        alt="QuoteEkonomiImg"
      />
    </div>

    {/* Mobile */}
    <div className="md:hidden w-full">
      <Image
        src={QuoteEkonomiImgMobile}
        className="w-full"
        width={360}
        height={520}
        alt="QuoteEkonomiImgMobile"
      />
    </div>
  </div>
  );
};