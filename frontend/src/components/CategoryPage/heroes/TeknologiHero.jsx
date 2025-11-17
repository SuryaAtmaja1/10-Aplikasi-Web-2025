"use client"
import React from "react";
import { useState } from "react";
import Image from "next/image";
import HeroForeground from "../../../../public/assets/category-sajak/foreground-tech.svg"
import HeroBackground from "../../../../public/assets/category-sajak/background-tech.svg"
import HeroMobile from "../../../../public/assets/category-sajak/hero-tech-mobile.svg"

export const TeknologiHero = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate percentage-based position (0 to 100)
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    
    // Convert to translation values (-50 to 50 for smooth movement)
    const translateX = (percentX - 50) * 1;
    const translateY = (percentY - 50) * 1;
    
    setPosition({ x: translateX, y: translateY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
  <div  className="h-[111.111vw] md:h-[48.3vw] w-full items-center justify-center overflow-hidden border-b">
    {/* Desktop */}
    <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="hidden md:block relative h-full w-full overflow-hidden cursor-crosshair">
      <Image
        src={HeroBackground}
        className="w-full absolute top-1/2 left-1/2 transition-transform duration-400 ease-out"
        style={{
          transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`
        }}
        width={1920}
        height={935}
        alt="HeroBackground"
      />        
      <Image
        src={HeroForeground}
        className="w-full absolute top-1/2 left-1/2 transition-transform duration-400 ease-out"
        style={{
          transform: `translate(calc(-50% + ${position.x * 0.5}px), calc(-50% + ${position.y * 0.5}px))`
        }}
        width={1920}
        height={935}
        alt="HeroForeground"
      />
      <div className="absolute flex flex-col md:mt-[30vw] md:ml-[35.156vw] origin-top-left scale-50 lg:scale-60 xl:scale-75 2xl:scale-100">
        <h2 className="font-instrument italic text-6xl text-putih bg-hitam w-fit tracking-widest">xxx sajak</h2>
        <h2 className="font-instrument italic text-6xl text-putih bg-hitam w-fit ml-28 tracking-widest">xx penulis</h2>
      </div>

      {/* Custom cursor */}
      <div
        className="absolute w-15 h-15 bg-oren pointer-events-none transition-all duration-75"
        style={{
          left: `${((position.x) + 50)}%`,
          top: `${((position.y) + 50)}%`,
          transform: 'translate(-50%, -50%)'
        }}
      />  
    </div>

    {/* Mobile */}
    <div className="relative md:hidden">
      <Image
        src={HeroMobile}
        className="w-full absolute"
        width={1920}
        height={935}
        alt="HeroMobile"
      />
      <div className="absolute flex flex-col mt-[70%] ml-[25%] origin-top-left">
        <h2 className="font-instrument italic text-xl text-putih bg-hitam w-fit tracking-widest">xxx sajak</h2>
        <h2 className="font-instrument italic text-xl text-putih bg-hitam w-fit ml-7 tracking-widest">xx penulis</h2>
      </div>
    </div>
  </div>
  );
};
