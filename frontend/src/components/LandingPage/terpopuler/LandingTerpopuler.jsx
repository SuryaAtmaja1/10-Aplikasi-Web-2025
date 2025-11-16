import React from "react";
import Link from "next/link";
import Image from "next/image";
import PopulerList from "./PopulerList";
import SignStar from "../../../../public/assets/landing/signstar.png"
import PointEye from "../../../../public/assets/landing/pointeye.png"
import { FaArrowRight } from "react-icons/fa6";

export default function LandingTerpopuler() {
  return (
    <section
      className={`
        relative overflow-hidden
        bg-foreground
        bg-center bg-repeat md:bg-cover md:bg-no-repeat
        p-7 NaroHasBeenHere gap-8 md:gap-14 lg:gap-24 pt-16 md:pt-26 pb-33  
      `}
    >

      <div
        aria-hidden
        className="absolute inset-0 bg-hitam pointer-events-none"
      />

      <div className="relative z-10">

        <Image
          src={SignStar}
          className="absolute -translate-x-[43%] -translate-y-[20%] transform transition duration-500 z-1"
          width={525}
          height={654}
          alt="SignStar"
        />
        <Image
          src={PointEye}
          className="absolute bottom-0 right-0 translate-x-[20%] translate-y-[30%] transform transition duration-500"
          width={356}
          height={356}
          alt="PointEye"
        />

        <div className="flex flex-col gap-8 md:gap-14 lg:gap-16">
          <h1 className="text-putih text-center text-4xl md:text-6xl lg:text-9xl font-instrument font-medium pt-6 z-20">
            <span className="font-instrument">Sajak </span><span className="font-jakarta">Terpopuler</span>
          </h1>

          <PopulerList />

          <Link href={"/"} className="place-self-center z-20">
            <button className="flex items-center gap-3 py-3 px-16 md:px-8  font-jakarta font-bold text-putih bg-cerise rounded-2xl border border-hitam hover:underline underline-offset-3 hover:cursor-pointer hover:shadow-md active:bg-hitam">
              Lihat semua
              <div className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-putih">
                  <FaArrowRight className="text-putih"/>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
