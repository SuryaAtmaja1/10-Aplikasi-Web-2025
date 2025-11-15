import React from "react";
import Image from "next/image";
import Pnulis from "../../../public/assets/landing/pnulis.svg"
import KursiOren from "../../../public/assets/kursi_oren.png"
import Kumbang from "../../../public/assets/landing/kumbang.png"
import BungaHijau from "../../../public/assets/landing/bunga-hijau.png"
import JempolMic from "../../../public/assets/landing/jempol-mic.svg"
import PencilCup from "../../../public/assets/landing/pencil-cup.svg"

export const ReviewPenulis = () => {
  return(
    <div className="relative flex font-jakarta h-[75vh] md:h-[70vh] lg:h-[90vh] xl:h-[104.67vh] w-full overflow-hidden border-t">
      {/* teks */}
      <div className="relative md:absolute h-fit flex flex-col md:right-0 text-right mt-30 md:mt-36 lg:mt-42 xl:mt-28 mx-5 md:pr-12 lg:pr-28 z-10">
        <div className="absolute w-full h-[50%] -translate-10 mask-t-from-50% bg-putih z-1"></div>
        <p className="place-self-end w-full md:w-[67vw] xl:w-[41.24vw] font-instrument text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-[2.7rem]/12 mb-5 md:mb-7 lg:mb-9 xl:mb-12 2xl:mb-14 z-100">“Singkat Sajak telah memberikan saya ruang untuk berekspresi dan komunitas mendukung yang tidak banyak ditemukan di tempat lain. Di sini saya merasa telah berkembang sebagai penulis bersama dengan penulis lainnya. “</p>
        <h2 className="mb-2 text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-[2.7rem] z-100">— Pnulis Handeal</h2>
        <h3 className="font-extralight text-xs md:text-sm lg:text-lg 2xl:text-[1.35rem]/7 self-end z-100">Pemenang Piala Dunia Sajak 2067, Trofi Penulis<br />Muda 2012, dan Hall-of-Fame Balap Karung RT 89</h3>
      </div>
      {/* gambar2 */}
      <Image
        src={Pnulis}
        className="absolute bottom-12 md:bottom-0 xl:bottom-[15vh] left-0 md:left-[11.875vw] w-[50vw] md:h-auto md:w-[38.177vw] z-100"
        width={653}
        height={700}
        alt="Pnulis"
      />
      <Image
        src={KursiOren}
        className="absolute w-[43.446vw] rotate-[-78.41deg] bottom-[-10vw] md:bottom-[-30vh] left-[8.5vw]"
        width={740}
        height={1000}
        alt="KursiOren"
      />
      <Image
        src={Kumbang}
        className="absolute w-[50vw] md:w-[34.657vw] rotate-[-24.3deg] top-[-5vh] left-[-6.7vw] pt-10 lg:pt-0"
        width={600}
        height={400}
        alt="Kumbang"
      />
      <Image
        src={BungaHijau}
        className="absolute w-[60vw] md:w-[30.933vw] rotate-180 top-[-9.67vh] left-[30vw] md:left-[16.3vw] mt-10 lg:mt-0"
        width={530}
        height={400}
        alt="BungaHijau"
      />
      <Image
        src={JempolMic}
        className="hidden md:block absolute w-[19.3vw] top-[31vh]"
        width={330}
        height={400}
        alt="JempolMic"
      />
      <Image
        src={PencilCup}
        className="absolute w-[37.699vw] bottom-0 right-[1vh]"
        width={645}
        height={570}
        alt="PencilCup"
      />
    </div>
  )
};