import React from "react";
import { DesktopNavbar } from "./Navbar/DesktopNavbar";
import { MobileNavbar } from "./Navbar/MobileNavbar";

export const Navbar = () => {
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
