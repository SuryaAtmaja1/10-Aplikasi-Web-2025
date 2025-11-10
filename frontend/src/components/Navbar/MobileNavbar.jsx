"use client";
import React, { useState, useCallback } from "react";
import { CATEGORIES } from "@/data/categories";
import LogoSingkatSajak from "../../../public/assets/LogoSingkatSajak";

import dynamic from "next/dynamic";
const BsJustify = dynamic(
  () => import("react-icons/bs").then((mod) => mod.BsJustify),
  { ssr: false }
);

const LoginButton = ({ onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`flex justify-center items-center py-3 px-6 rounded-[20px] hover:cursor-pointer ${className}`}
  >
    <span className="text-[#FFF9F4] font-bold text-[16px]">Log In</span>
  </button>
);

export const MobileNavbar = React.memo(function MobileNavbar() {
  const [open, setOpen] = useState(false);
  const toggleOpen = useCallback(() => setOpen((v) => !v), []);
  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <div className="relative">
      <div className="flex items-center justify-between px-4 border-b h-16">
        <div className="flex items-center space-x-3">
          <div className="flex font-playfair items-center font-bold text-[20px] space-x-2 hover:cursor-pointer">
            <div>Singkat</div>
            <LogoSingkatSajak className="text-[#363231] w-8" />
            <div>Sajak</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleOpen}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="p-2 rounded-md hover:bg-gray-100 md:hidden"
          >
            <BsJustify size={22} />
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          className="absolute left-0 right-0 top-16 z-40 bg-white border-b shadow-md animate-slide-down md:hidden"
          role="menu"
          style={{ height: "calc(100vh - 4rem)" }}
        >
          <div className="flex flex-col justify-between h-full bg-[#FFF9F4] ">
            <div className="px-4 py-4 space-y-2">
              {CATEGORIES.map((cat) => (
                <a
                  key={cat.id ?? cat.name}
                  role="menuitem"
                  href={cat.href ?? "#"}
                  className="block border-b-2 border-transparent py-3 text-center uppercase text-sm font-medium hover:text-[#FA7921] hover:bg-[#FFEAC7] active:bg-[#FFD08A] transition-colors"
                  onClick={closeMenu}
                >
                  {cat.name}
                </a>
              ))}
            </div>

            <div className="px-4 py-4 border-t">
              <LoginButton className="w-full bg-[#363231] hover:bg-[#4A4442] flex justify-center" />
            </div>
          </div>
        </nav>
      )}
    </div>
  );
});
