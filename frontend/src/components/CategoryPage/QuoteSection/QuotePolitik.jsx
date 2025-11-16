import React from "react";
import Image from "next/image";
import QuotePolitikImg from "../../../../public/assets/category-sajak/quotes/quote-politik.svg"
import QuotePolitikImgMobile from "../../../../public/assets/category-sajak/quotes/quote-politik-mobile.svg"

export const QuotePolitik = () => {
  return (
  <div className="relative flex w-screen overflow-hidden border-b">
    {/* Desktop */}
    <div className="hidden md:block">
      <Image
        src={QuotePolitikImg}
        className="w-full"
        width={1920}
        height={1080}
        alt="QuotePolitikImg"
      />
    </div>

    {/* Mobile */}
    <div className="md:hidden w-full">
      <Image
        src={QuotePolitikImgMobile}
        className="w-full"
        width={360}
        height={520}
        alt="QuotePolitikImgMobile"
      />
    </div>
  </div>
  );
};