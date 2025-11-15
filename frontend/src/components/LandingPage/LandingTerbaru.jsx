import React from "react";
import Image from "next/image";
import KakekKakek from "../../../public/assets/landing/kakek-duduk.png"
import LihatSemua from "../../../public/assets/landing/LihatSemua"

export const LandingTerbaru = () => {
  return(
    <div className="relative flex font-jakarta h-fit mt-12">
      <h1 className="absolute z-100 right-0 text-[2.25rem] md:text-[9.5rem] text-nowrap px-[3vw]">
        <span className="font-instrument">SAJAK </span><span className="font-bold">TERBARU</span>
      </h1>
      <div className="relative flex items-center h-fit md:h-[88vh] w-full mt-10 md:mt-44">
        <Image
            src={KakekKakek}
            className="absolute self-start z-100 origin-[0%_53.38%] w-[19.427vw] ml-2 md:ml-18 -translate-y-[8.7vw] mask-l-from-50% mask-l-to-50% transform transition duration-200 ease-in-out hover:-translate-x-20 active:translate-x-[100] focus:scale-110"
            height={1000}
            alt="kakek-kakek duduk membaca"
          />
        <Image
            src={KakekKakek}
            className="absolute self-start z-100 origin-[0%_53.38%] w-[19.427vw] ml-2 md:ml-18 -translate-y-[8.7vw] mask-r-from-50% mask-r-to-50% transform transition duration-200 ease-in-out hover:-translate-x-20 active:translate-x-[100] focus:scale-110"
            height={1000}
            alt="kakek-kakek duduk membaca"
          />
        <div className="relative flex flex-row justify-end h-full w-full md:w-[73.75vw] bg-cerise pt-9 md:pt-14 px-5 md:px-12 pb-4 md:pb-10">
          {/* articles */}
          <div className="grid grid-cols-3 grid-rows-2 gap-3 md:gap-10 w-[760px] h-[70vh] md:h-[76.67vh]">
            <a href="" className="bg-putih relative flex flex-col justify-between w-full h-full py-1.5 md:py-4 px-1.5 md:px-4 hover:-translate-2 hover:shadow-[6px_6px_0_black] active:scale-90">
              <h1 className="md:text-3xl font-bold">Judul</h1>
              <h2 className="font-instrument md:text-xl text-nowrap">Nama Penulis</h2>
            </a>
            <a href="" className="bg-putih relative flex flex-col justify-between w-full h-full py-1.5 md:py-4 px-1.5 md:px-4 hover:-translate-2 hover:shadow-[6px_6px_0_black] active:scale-90">
              <h1 className="md:text-3xl font-bold">Judul</h1>
              <h2 className="font-instrument md:text-xl text-nowrap">Nama Penulis</h2>
            </a>
            <a href="" className="bg-putih relative flex flex-col justify-between w-full h-full py-1.5 md:py-4 px-1.5 md:px-4 hover:-translate-2 hover:shadow-[6px_6px_0_black] active:scale-90">
              <h1 className="md:text-3xl font-bold">Judul</h1>
              <h2 className="font-instrument md:text-xl text-nowrap">Nama Penulis</h2>
            </a>
            <a href="" className="bg-putih relative flex flex-col justify-between w-full h-full py-1.5 md:py-4 px-1.5 md:px-4 hover:-translate-2 hover:shadow-[6px_6px_0_black] active:scale-90">
              <h1 className="md:text-3xl font-bold">Judul</h1>
              <h2 className="font-instrument md:text-xl text-nowrap">Nama Penulis</h2>
            </a>
            <a href="" className="bg-putih relative flex flex-col justify-between w-full h-full py-1.5 md:py-4 px-1.5 md:px-4 hover:-translate-2 hover:shadow-[6px_6px_0_black] active:scale-90">
              <h1 className="md:text-3xl font-bold">Judul</h1>
              <h2 className="font-instrument md:text-xl text-nowrap">Nama Penulis</h2>
            </a>
            <a href="" className="bg-putih relative flex flex-col justify-between w-full h-full py-1.5 md:py-4 px-1.5 md:px-4 hover:-translate-2 hover:shadow-[6px_6px_0_black] active:scale-90">
              <h1 className="md:text-3xl font-bold">Judul</h1>
              <h2 className="font-instrument md:text-xl text-nowrap">Nama Penulis</h2>
            </a>
            {/* show more */}
            <a href="" className="bg-hitam text-putih font-bold text-base md:text-xl col-span-3 lg:col-span-1 h-fit text-center py-3 rounded-2xl mt-1 hover:underline active:bg-black focus:text-cerise">SHOW MORE...</a>
          </div>
        </div>
        <a href="" className="hidden md:flex items-center justify-center h-full w-[26.25vw] px-6 md:bg-foreground lg:bg-background hover:bg-hitam focus:bg-cerise active:bg-black">
          <LihatSemua className="w-[23vw]" />
        </a>
      </div>
    </div>
  )
};