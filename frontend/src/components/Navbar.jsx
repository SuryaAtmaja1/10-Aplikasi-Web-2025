"use client";
import React from "react";
import { DesktopNavbar } from "./Navbar/DesktopNavbar";
import { MobileNavbar } from "./Navbar/MobileNavbar";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  if (!pathname) return null;
  if (pathname.startsWith("/auth")) return null;
  return (
    <>
      <div className="md:hidden">
        <MobileNavbar />
      </div>
      <div className="hidden md:flex">
        <DesktopNavbar />
      </div>
    </>
  );
};
