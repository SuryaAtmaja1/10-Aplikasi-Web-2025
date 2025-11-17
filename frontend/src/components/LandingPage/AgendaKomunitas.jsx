"use client"
import React from "react";
import Image from "next/image";
import Technocorner from "../../../public/assets/landing/technocorner.png"
import Firstgath from "../../../public/assets/landing/firstgath.png"
import ArrowUpRight from "../../../public/assets/landing/ArrowUpRight";

export const AgendaKomunitas = () => {
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
    <div id="agendaKomunitas" className="relative font-jakarta border-b overflow-hidden">
      {/* Desktop */}
      <div className="hidden relative md:flex flex-col h-fit mt-28 mb-40 lg:mb-64">
        <div className="absolute w-full h-[24vh] lg:h-[36vh] xl:h-[42vh] 2xl:h-[46.296vh] bg-oren translate-y-[90vh] lg:translate-y-[100vh] xl:translate-y-[103vh] 2xl:translate-y-[101vh] z-2" style={{transform: `translateY(-${offset * 0.267}px)`}}></div>
        <h1 className="z-100 text-[4.5rem] lg:text-[7rem] xl:text-[9.5rem] text-nowrap px-6 xl:px-12">
          <span className="font-bold">Agenda </span><span className="font-instrument">Komunitas</span>
        </h1>
        <div className="relative flex flex-row gap-6 lg:gap-12 2xl:gap-18 px-6 xl:px-12 z-100">
          <article className="bg-background transform transition hover:scale-102">
            <Image
              src={Technocorner}
              className="w-[37.5vw]"
              width={720}
              alt="Technocorner"
            />
            <h1 className="text-3xl xl:text-6xl font-instrument w-fit pb-0.5 border-b-2 mt-1 xl:mt-3">Amerika, 2067</h1>
            <h2 className="text-base xl:text-2xl 2xl:text-4xl mt-1 xl:mt-2"><span className="italic">Last Gath </span><span>Komunitas Singkat Sajak</span></h2>
          </article>
          <article className="bg-background transform transition hover:scale-102">
            <Image
              src={Firstgath}
              className="w-[37.5vw]"
              width={720}
              alt="kakek-kakek duduk membaca"
            />
            <h1 className="text-3xl xl:text-6xl font-instrument w-fit pb-0.5 border-b-2 mt-1 xl:mt-3">Yogyakarta, 2025</h1>
            <h2 className="text-base xl:text-2xl 2xl:text-4xl mt-1 xl:mt-2"><span className="italic">First Gath </span><span>Komunitas Singkat Sajak</span></h2>
          </article>
          <div className="group absolute right-0 flex flex-col items-end pr-6 md:pr-20 lg:pr-16 xl:pr-12 origin-top-right scale-45 lg:scale-67 xl:scale-73 2xl:scale-100">
            <div className="bg-hitam p-6 transform transition duration-200 ease-in-out origin-top-right group-hover:scale-110"><ArrowUpRight /></div>
            <h3 className="text-right text-[2.5rem]/11.5 font-extrabold text-putih mt-6 text-shadow-[2px_2px_0px_rgb(250_121_33)] transform transition group-hover:underline group-hover:translate-y-2">Pelajari<br />Lebih<br />Lanjut<br />...</h3>
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className="md:hidden absolute w-full h-[254px] bg-oren translate-y-[124px]"></div>
      <div className="md:hidden relative flex flex-col h-fit mt-5 pb-10 px-5">
        <h1 className="z-100 text-[2rem] text-nowrap">
          <span className="font-bold">Agenda </span><span className="font-instrument">Komunitas</span>
        </h1>
        <div className="relative flex w-full mt-2 mb-11">
          <article className="bg-background">
            <Image
              src={Technocorner}
              className=""
              width={236}
              alt="Technocorner"
            />
            <h1 className="pl-1 text-xl font-instrument w-fit border-b mt-1">Amerika, 2067</h1>
            <h2 className="pl-1 text-sm"><span className="italic">Last Gath </span><span>Komunitas Singkat Sajak</span></h2>
          </article>
          <div className="h-fit w-fit bg-hitam p-4 origin-top-left scale-26 translate-x-4"><ArrowUpRight /></div>
        </div>
        <div className="relative flex justify-end w-full mb-6">
          <div className="h-fit w-fit bg-hitam p-4 origin-top-right scale-26 -translate-x-4"><ArrowUpRight /></div>
          <article className="bg-background">
            <Image
              src={Firstgath}
              className=""
              width={236}
              alt="Technocorner"
            />
            <h1 className="pl-1 text-xl font-instrument w-fit border-b mt-1">Yogyakarta, 2025</h1>
            <h2 className="pl-1 text-sm"><span className="italic">Last Gath </span><span>Komunitas Singkat Sajak</span></h2>
          </article>
        </div>
        <h2 className="font-extrabold text-xl underline text-oren">Pelajari lebih lanjut ...</h2>
      </div>
    </div>
  )
};