import React from "react";
import Image from "next/image";
import QuoteSosialImg from "../../../../public/assets/category-sajak/quotes/quote-sosial.svg"
import QuoteSosialImgMobile from "../../../../public/assets/category-sajak/quotes/quote-sosial-mobile.svg"

export const QuoteSosial = () => {
  return (
  <div className="relative flex w-screen overflow-hidden border-b">
    {/* Desktop */}
    <div className="hidden md:block">
      <Image
        src={QuoteSosialImg}
        className="w-full"
        width={1920}
        height={1080}
        alt="QuoteSosialImg"
      />
    </div>

    {/* Mobile */}
    <div className="md:hidden w-full">
      <Image
        src={QuoteSosialImgMobile}
        className="w-full"
        width={360}
        height={520}
        alt="QuoteSosialImgMobile"
      />
    </div>
  </div>
  );
};