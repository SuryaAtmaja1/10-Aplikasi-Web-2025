import React from "react";
import { CATEGORIES } from "@/data/categories";
import LogoSingkatSajak from "../../public/assets/LogoSingkatSajak";
import LogoKMTETI from "../../public/assets/LogoKMTETI";
import LogoUGM from "../../public/assets/LogoUGM";

export const Footer = () => {
  const email = "singkatsajak@gmail.com";
  const phone = "+62 8123456789";
  return (
    <div className="relative bg-[#363231] text-[#FFF9F4] w-full px-36 pt-20 pb-16">
      <div className="flex justify-between">
        <div className="max-w-5/12">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <div className="flex gap-4 font-playfair font-bold text-[50px]">
                <div className="hover:cursor-pointer">Singkat</div>
                <LogoSingkatSajak className="text-[#FFF9F4] w-12 hover:cursor-pointer" />
                <div className="hover:cursor-pointer">Sajak</div>
              </div>
              <div className="text-[16px] max-w-3/4">
                sebuah komunitas jurnalis yang berkarya melalui tulisan-tulisan
                mengenai alam, kearifan lokal, politik, sosial, ekonomi, dan
                teknologi.
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-[24px]">Presented By</h2>{" "}
              <div className="flex gap-4">
                <LogoUGM className="text-[#FFF9F4] w-8 hover:cursor-pointer" />
                <LogoKMTETI className="text-[#FFF9F4] w-7 hover:cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between min-w-5/12 ">
          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-2xl">SAJAK-SAJAK</h2>
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
          <div className="flex flex-col justify-normal gap-4">
            <h2 className="font-bold text-2xl">KONTAK KAMI</h2>
            <div className="flex flex-col gap-3 text-[14px]">
              <p className="hover:cursor-pointer underline">{email}</p>
              <p className="hover:cursor-pointer">{phone}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[14px]">
        &copy; Singkat Sajak 2025. All rights reserved.
      </div>
    </div>
  );
};
