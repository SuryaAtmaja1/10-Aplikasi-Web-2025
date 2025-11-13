import React from "react";
import Image from "next/image";
import Bunga from "../../../public/assets/bunga.png"
import ArrowRightCircle from "../../../public/assets/ArrowRightCircle";
import Kocheng from "../../../public/assets/Kocheng";
import WritePlus from "../../../public/assets/WritePlus";
import Proklamasi from "../../../public/assets/proklamasi.svg"

export const LandingHero = () => {
  return(
    <div>
      <div className="font-jakarta w-[88.889vw] md:w-[75.833vw] h-[75vh] place-self-center mt-10 mb-16 md:mb-24 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 lg:gap-5 h-full">
          {/* Sajak Hari Ini */}
          <div className="h-full flex flex-col">
            <a href="" className="group relative flex flex-col items-center grow overflow-hidden rounded-lg md:rounded-2xl border bg-gray-950 text-background">
              <div className="absolute inset-0"></div>
              <h1 className="text-8xl mb-8"><span className="font-instrument">SAJAK</span><span className="font-bold"> HARI INI</span></h1>
              <h2 className="font-instrument italic text-5xl">judul</h2>
              <h3 className="text-2xl font-extralight mb-8">nama penulis</h3>
              <p className="font-instrument text-3xl">placeholder placeholder placeholder</p>
              <p className="font-instrument text-3xl">placeholder placeholder placeholder</p>
              <p className="font-instrument text-3xl">placeholder placeholder placeholder</p>
              <a className="absolute bg-cerise bottom-0 right-0 mr-6 mb-6 px-6 py-2.5 rounded-2xl text-xl font-bold">Baca Selengkapnya ...</a>
            </a>
          </div>
          {/* ---- kolom kanan ---- */}
          <div className="h-full flex flex-col gap-2 md:gap-4 lg:gap-5">
            {/* Tulis Sajak */}
            <a href="" className="group relative flex md:grow overflow-hidden rounded-lg md:rounded-2xl h-20 md:h-auto border">
              <Image
                  src={Proklamasi}
                  className="absolute"
                  layout="fit" 
                  objectFit="contain"
                  alt="ilustrasi tangan menulis"
                />
              <div className="absolute flex flex-col-reverse md:flex-row md:items-center justify-between w-full h-full md:h-auto bottom-0 mb-2.5">
                <h1 className="font-jakarta font-bold text-xl md:text-4xl xl:text-6xl 2xl:text-[5.3rem] text-nowrap ml-2.5">TULIS SAJAK</h1>
                <WritePlus className="h-[30px] md:h-12 2xl:h-[72px] w-auto mr-3" />
              </div>
            </a>
            {/* bantuan */}
            <a href="" className="group relative flex flex-row items-center justify-between overflow-hidden rounded-lg md:rounded-2xl h-fit py-2.5 md:py-4 px-2.5 md:px-6 border">
              <p className="font-instrument italic text-sm md:text-2xl">Pertama kali menulis sajak?</p>
              <div className="flex items-center gap-2 md:gap-5 justify-center">
                <p className="font-jakarta font-bold underline text-xs md:text-lg text-oren justify-center">Ikuti panduan kami.</p>
                <ArrowRightCircle className="h-6 w-6 md:h-10 md:w-10 text-oren" />
              </div>
            </a>
            {/* ---------- bottom grid ---------- */}
            <div className="flex flex-row items-center justify-center gap-2 md:gap-6 h-[32.32%] w-full">
              {/* total sajak */}
              <a href="" className="group relative flex items-center justify-center overflow-hidden rounded-lg md:rounded-2xl h-full w-full border">
                <h2 className="absolute font-jakarta font-extrabold text-2xl md:text-5xl text-biru opacity-[.67] top-2 md:top-6 left-2 md:left-4">TOTAL</h2>
                <h2 className="absolute font-jakarta font-extrabold text-2xl md:text-5xl text-biru opacity-[.67] bottom-2 md:bottom-6 right-2 md:right-4 mt-6 ml-4">KARYA</h2>
                <Image
                  src={Bunga}
                  className="opacity-[.67]"
                  layout="fill" 
                  objectFit="contain"
                  alt="gambar bunga"
                />
                <h1 className="z-10 font-instrument text-6xl md:text-7xl xl:text-9xl text-cerise">67,676</h1>
              </a>
              {/* kocheng */}
              <a href="" className="group relative overflow-hidden rounded-lg md:rounded-2xl h-full w-[64.76%] ">
                <Kocheng className="h-full w-full" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};