import React from "react";
import Image from "next/image";
import QuoteAlamImg from "../../../../public/assets/category-sajak/quotes/quote-alam.svg"
import QuoteAlamImgMobile from "../../../../public/assets/category-sajak/quotes/quote-alam-mobile.svg"

export const QuoteAlam = () => {
  return (
  <div className="relative w-full overflow-hidden border-b">
    {/* Desktop */}
    <div className="hidden md:block">
      <Image
        src={QuoteAlamImg}
        className="w-full"
        width={1920}
        height={1080}
        alt="QuoteAlamImg"
      />
    </div>

    {/* Mobile */}
    <div className="md:hidden w-full">
      <Image
        src={QuoteAlamImgMobile}
        className="w-full"
        width={360}
        height={520}
        alt="QuoteAlamImgMobile"
      />
    </div>
  </div>
  );
};