"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

export default function NotFound() {
  return (
    <section className="relative items-center justify-center flex flex-col py-32">
      <h1 className="text-6xl md:text-8xl font-jakarta text-hitam font-bold text-center mb-4">404</h1>
      <h2 className="text-3xl md:text-5xl font-instrument text-hitam text-center border-t pt-4 mb-16">Laman tidak ditemukan.</h2>
      <Link href={"/"} className="">
          <button className="flex items-center gap-3 py-3 px-5 font-jakarta font-bold text-cerise rounded-full border border-hitam hover:underline underline-offset-3 hover:cursor-pointer hover:shadow-md active:bg-hitam">
            Kembali ke Beranda
            <div className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-cerise">
                <FaArrowRight className="text-cerise"/>
            </div>
          </button>
      </Link>
  </section>
  );
}