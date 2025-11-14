import React from "react";
import Image from "next/image";

export const ReviewPenulis = () => {
  return(
    <div className="relative flex font-jakarta h-[90vh] w-full justify-end border-t">
      <div className="flex flex-col text-right pt-28 pr-28">
        <p className="w-[700px] font-instrument text-[2.7rem]/[48px] mb-14">“Singkat Sajak telah memberikan saya ruang untuk berekspresi dan komunitas mendukung yang tidak banyak ditemukan di tempat lain. Di sini saya merasa telah berkembang sebagai penulis bersama dengan penulis lainnya. “</p>
        <h2 className="mb-2 text-[2.7rem]">— Pnulis Handeal</h2>
        <h3 className="w-[580px] font-extralight text-[1.35rem]/7 self-end">Pemenang Piala Dunia Sajak 2067, Trofi Penulis<br />Muda 2012, dan Hall-of-Fame Balap Karung RT 89</h3>
      </div>
    </div>
  )
};