"use client"
import React from "react";
import Image from "next/image";
import Pnulis from "../../../public/assets/landing/pnulis.svg"
import KursiOren from "../../../public/assets/kursi_oren.png"
import Kumbang from "../../../public/assets/landing/kumbang.png"
import BungaHijau from "../../../public/assets/landing/bunga-hijau.png"
import JempolMic from "../../../public/assets/landing/jempol-mic.svg"
import PencilCup from "../../../public/assets/landing/pencil-cup.svg"

export const ReviewPenulis = () => {
  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const scale = window.innerHeight * 0.002;
      setOffset(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return(
    <div className="parallax-container border-t relative overflow-hidden">
      <div className="parallax-group relative font-jakarta h-[75vh] md:h-[70vh] lg:h-[90vh] xl:h-[104.67vh] w-full">
        
        {/* Layer 3: Deep background (moves f stest) */}
        <div className="layer-deep absolute inset-0" style={{transform: `translateY(${offset * 0.67}px)`}}>
          <Image
            src={Kumbang}
            className="absolute w-[50vw] md:w-[34.657vw] rotate-[-24.3deg] top-[-210vh] md:top-[-250vh] lg:top-[-280vh] xl:top-[-295vh] left-[-6.7vw]"
            width={600}
            height={400}
            alt="Kumbang"
          />
          <Image
            src={BungaHijau}
            className="absolute w-[60vw] md:w-[30.933vw] rotate-180 top-[-218vh] md:top-[-256vh] lg:top-[-284vh] xl:top-[-300vh] 2xl:top-[-300vh] left-[30vw] md:left-[16.3vw] mt-10 lg:mt-0"
            width={530}
            height={400}
            alt="BungaHijau"
          />
          <Image
            src={JempolMic}
            className="hidden md:block absolute w-[19.3vw] top-[-230vh] lg:top-[-258vh]"
            width={330}
            height={400}
            alt="JempolMic"
          />
          <Image
            src={PencilCup}
            className="absolute w-[37.699vw] bottom-[215vh] md:bottom-[250vh] lg:bottom-[275vh] xl:bottom-[292vh] right-[3vh]"
            width={645}
            height={570}
            alt="PencilCup"
          />
        </div>

        {/* Layer 2: Middle layer (moves medium speed) */}
        <div className="layer-back absolute inset-0" style={{transform: `translateY(${offset * 0.267}px)`}}>
          <Image
            src={Pnulis}
            className="absolute z-10 bottom-200 md:bottom-[100vh] lg:bottom-[110vh] xl:bottom-[132vh] left-0 md:left-[11.875vw] w-[50vw] md:h-auto md:w-[38.177vw]"
            width={653}
            height={700}
            alt="Pnulis"
          />
          <Image
            src={KursiOren}
            className="absolute w-[43.446vw] rotate-[-78.41deg] bottom-180 md:bottom-[87vh] left-[8.5vw]"
            width={740}
            height={1000}
            alt="KursiOren"
          />
        </div>

        {/* Layer 1: Base layer (no movement) */}
        <div className="layer-base absolute inset-0">
          <div className="relative md:absolute h-fit flex flex-col md:right-0 text-right mt-30 md:mt-36 lg:mt-42 xl:mt-28 mx-5 md:pr-12 lg:pr-28 z-10">
            <p className="place-self-end w-full md:w-[67vw] xl:w-[41.24vw] font-instrument text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-[2.7rem]/12 mb-5 md:mb-7 lg:mb-9 xl:mb-12 2xl:mb-14">"Singkat Sajak telah memberikan saya ruang untuk berekspresi dan komunitas mendukung yang tidak banyak ditemukan di tempat lain. Di sini saya merasa telah berkembang sebagai penulis bersama dengan penulis lainnya. "</p>
            <h2 className="mb-2 text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-[2.7rem]">— Pnulis Handeal</h2>
            <h3 className="font-extralight text-xs md:text-sm lg:text-lg 2xl:text-[1.35rem]/7 self-end">Pemenang Piala Dunia Sajak 2067, Trofi Penulis<br />Muda 2012, dan Hall-of-Fame Balap Karung RT 89</h3>
          </div>
        </div>

      </div>
    </div>
  )
};