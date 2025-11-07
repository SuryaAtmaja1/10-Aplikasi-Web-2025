import React from "react";
import { CATEGORIES } from "@/data/categories";
import LogoSingkatSajak from "../../public/assets/LogoSingkatSajak";
import LogoKMTETI from "../../public/assets/LogoKMTETI";
import LogoUGM from "../../public/assets/LogoUGM";

export const Footer = () => {
  const email = "singkatsajak@gmail.com";
  const phone = "+62 8123456789";
  return (
    <div className="relative bg-[#363231] text-[#FFF9F4] w-full px-20 sm:px-28 lg:px-36 pt-20 pb-16">
      <div className="flex flex-col md:items-start md:flex-row md:justify-between gap-9">
        <div className="min-w-1/2">
          <div className="flex flex-col items-center md:items-start gap-10">
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-center md:justify-start gap-4 font-playfair font-bold text-3xl sm:text-[50px] md:text-4xl lg:text-[50px]">
                <div className="hover:cursor-pointer flex-initial">Singkat</div>
                <LogoSingkatSajak className="text-[#FFF9F4] w-5 sm:w-8 lg:w-12 hover:cursor-pointer flex-none" />
                <div className="hover:cursor-pointer flex-initial">Sajak</div>
              </div>
              <div className="text-[16px] text-center md:text-left lg:max-w-3/4">
                sebuah komunitas jurnalis yang berkarya melalui tulisan-tulisan
                mengenai alam, kearifan lokal, politik, sosial, ekonomi, dan
                teknologi.
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-[18px] lg:text-[24px]">Presented By</h2>{" "}
              <div className="flex gap-4 justify-center md:justify-start">
                <LogoUGM className="text-[#FFF9F4] w-8 hover:cursor-pointer" />
                <LogoKMTETI className="text-[#FFF9F4] w-7 hover:cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-around min-w-1/2 gap-7 sm:gap-5">
          <div className="flex flex-col gap-4 text-center sm:text-left">
            <h2 className="font-bold text-[18px] lg:text-2xl">SAJAK-SAJAK</h2>
            <div className="flex flex-col gap-3">
              {CATEGORIES.map((item, index) => (
                <div
                  key={index}
                  className="hover:cursor-pointer hover:underline text-[14px]"
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-normal gap-4 text-center sm:text-left">
            <h2 className="font-bold text-[18px] lg:text-2xl">KONTAK KAMI</h2>
            <div className="flex flex-col gap-3 text-[14px]">
              <p className="hover:cursor-pointer underline">{email}</p>
              <p className="hover:cursor-pointer">{phone}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[14px] text-center ">
        &copy; Singkat Sajak 2025. All rights reserved.
      </div>
    </div>
  );
};
