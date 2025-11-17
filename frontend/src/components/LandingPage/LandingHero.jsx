"use client"
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Bunga from "../../../public/assets/landing/bunga.png"
import ArrowRightCircle from "../../../public/assets/landing/ArrowRightCircle";
import Kocheng from "../../../public/assets/landing/Kocheng";
import WritePlus from "../../../public/assets/landing/WritePlus";
import Proklamasi from "../../../public/assets/landing/proklamasi.svg"

export const LandingHero = () => {
  const scrollToTarget = () => {
    const targetElement = document.getElementById('agendaKomunitas');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return(
    <div className="font-jakarta w-[88.889vw] md:w-[75.833vw] h-[75vh] place-self-center mt-10 md:mb-24 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 lg:gap-5 h-full duration-300 ease-in-out">
        {/* Sajak Hari Ini */}
        <div className="group h-full flex flex-col transform transition duration-700 hover:scale-102">
          <a href="" className="group relative flex flex-col items-center grow overflow-hidden rounded-lg md:rounded-2xl border bg-gray-950 text-background pt-2 md:pt-4 pb-12 px-4">
            <div className="absolute inset-0"></div>
            <h1 className="text-4xl md:text-4xl lg:text-5xl 2xl:text-8xl text-nowrap mb-6 md:mb-8"><span className="font-instrument">SAJAK</span><span className="font-bold"> HARI INI</span></h1>
            <h2 className="font-instrument italic text-2xl md:text-3xl xl:text-5xl">judul</h2>
            <h3 className="text-lg xl:text-2xl font-extralight mb-4 md:mb-8">nama penulis</h3>
            <p className="font-instrument text-md xl:text-3xl">placeholder placeholder placeholder</p>
            <h4 className="absolute bg-cerise bottom-0 right-0 mr-4 mb-4 xl:mr-6 xl:mb-6 px-4 md:px-6 py-2.5 rounded-lg md:rounded-2xl text-sm xl:text-xl font-bold hover:underline transform transition group-hover:-translate-y-1">Baca Selengkapnya ...</h4>
          </a>
        </div>
        {/* ---- kolom kanan ---- */}
        <div className="h-full flex flex-col gap-2 md:gap-4 lg:gap-5">
          {/* Tulis Sajak */}
          <Link href="/sajak/post" className="group relative flex md:grow overflow-hidden rounded-lg md:rounded-2xl h-full md:h-auto border transform transition duration-1000 ease-in-out hover:scale-105">
          {/* <a href="" className="group relative flex md:grow overflow-hidden rounded-lg md:rounded-2xl h-full md:h-auto border transform transition duration-1000 motion-safe:transition-[clip-path] hover:[clip-path:polygon(0%_0%,88%_0%,100%_50%,88%_100%,50%_100%,0%_100%)] [clip-path:polygon(0%_0%,100%_0%,100%_50%,100%_100%,100%_100%,0%_100%)]"> */}
            <Image
                src={Proklamasi}
                className="hidden md:block absolute [clip-path:polygon(53%_0%,100%_0%,100%_100%,50.17%_100%)] motion-safe:transition motion-safe:duration-1000 group-hover:-translate-x-66 group-hover:-translate-y-58 z-10"
                width={700}
                alt="ilustrasi tangan menulis"
              />
            <div className="absolute inset-0 motion-safe:transition-[clip-path] motion-safe:duration-1000 group-hover:[clip-path:circle(10%_at_1%_-1%)] [clip-path:circle(80%_at_0%_0%)] z-10">
            <Image
                src={Proklamasi}
                className="hidden md:block absolute [clip-path:polygon(0%_0%,53%_0%,50%_100%,0%_100%)]"
                width={700}
                alt="ilustrasi tangan menulis"
              />
            </div>
            <Image
                src={Proklamasi}
                className="md:hidden absolute w-full h-[150%] -translate-x-[25%] -translate-y-[30%]"
                height={5000}
                alt="ilustrasi tangan menulis"
              />
            <div className="hidden absolute md:flex items-center justify-between w-full h-fit bottom-0 right-0 mb-2.5 motion-safe:transition">
              <h1 className="font-jakarta font-bold text-4xl xl:text-6xl 2xl:text-[5.3rem] text-nowrap ml-2.5 motion-safe:duration-1000 ease-in-out group-hover:-translate-y-30">TULIS SAJAK</h1>
              <div className="absolute right-0 motion-safe:duration-1000 ease-in-out group-hover:-translate-y-30">
                <div className="absolute h-16 w-16 bg-hitam motion-safe:duration-1000 ease-in-out origin-left group-hover:scale-600"></div>
                <WritePlus className="md:h-10 2xl:h-16 mr-3 translate-y-0.5 motion-safe:duration-1000 ease-in-out group-hover:translate-x-1.5" />
              </div>
            </div>
            <h1 className="md:hidden absolute bottom-0 right-0 font-jakarta font-bold text-2xl text-nowrap">TULIS SAJAK</h1>
            <WritePlus className="md:hidden absolute right-0 top-0 h-[30px] md:h-12 2xl:h-[72px] w-auto" />
          </Link>
          {/* bantuan */}
          <a href="" className="group relative flex flex-row items-center justify-between gap-3 overflow-hidden rounded-lg md:rounded-2xl h-fit py-2.5 md:py-4 px-2.5 md:px-6 border hover:-translate-y-1 active:bg-oren transform transition">
            <p className="font-instrument italic text-sm md:text-base xl:text-2xl">Pertama kali menulis sajak?</p>
            <div className="flex items-center gap-2 xl:gap-5 justify-center">
              <p className="font-jakarta font-bold group-hover:underline text-xs md:text-sm xl:text-lg text-oren group-active:text-putih justify-center">Ikuti panduan kami.</p>
              <ArrowRightCircle className="h-6 w-6 xl:h-10 xl:w-10 text-oren group-active:text-white" />
            </div>
          </a>
          {/* ---------- bottom grid ---------- */}
          <div className="flex flex-row items-center justify-center gap-2 md:gap-6 h-[32.32%] w-full">
            {/* total sajak */}
            <a href="" className="group relative flex items-center justify-center overflow-hidden rounded-lg md:rounded-2xl h-full w-full border hover:zoom active:scale-95">
              <h2 className="absolute font-jakarta font-extrabold text-2xl md:text-5xl text-biru opacity-[.67] top-2 md:top-6 left-2 md:left-4">TOTAL</h2>
              <h2 className="absolute font-jakarta font-extrabold text-2xl md:text-5xl text-biru opacity-[.67] bottom-2 md:bottom-6 right-2 md:right-4 mt-6 ml-4">KARYA</h2>
              <Image
                src={Bunga}
                className="opacity-[.67] group-hover:scale-110 transform transition duration-670 ease-in-out"
                layout="fill" 
                objectFit="contain"
                alt="gambar bunga"
              />
              <h1 className="z-10 font-instrument text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl text-cerise group-hover:scale-120 duration-670 ease-in-out transform transition">67,676</h1>
            </a>
            {/* kocheng */}
            <Link href="#agendaKomunitas" scroll={false} onClick={scrollToTarget} className="group relative overflow-hidden rounded-lg md:rounded-2xl h-full w-[64.76%] transform transition duration-200 ease-in-out hover:scale-120 active:scale-90">
              <Kocheng className="h-full w-full" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
};