"use client";

import React, { useEffect, useRef, useState } from "react";
import { CATEGORIES } from "@/data/categories";
import LogoSingkatSajak from "../../../public/assets/LogoSingkatSajak";
import LoginButton from "./LoginButton";
import { FaRegUserCircle } from "react-icons/fa";
import api from "@/utils/axiosInstance";
import Modal from "../Modal";
import toast from "react-hot-toast";

export const DesktopNavbar = React.memo(function DesktopNavbar() {
  const [visible, setVisible] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await api.get("/user");
        console.log("REFRESH TOKEN RESPONSE:", res);
        if (
          res?.data &&
          (res.data.user || res.data.loggedIn || res.status === 200)
        ) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
        toast.success("Berhasil login.");
      } catch (err) {
        setIsLoggedIn(false);
        toast.error("Anda belum login.");
      }
    };

    checkLogin();
  }, []);

  const handleLogoutRequest = () => setIsLogoutModalOpen(true);
  const handleConfirmLogout = async () => {
    try {
      await api.post("/auth/logout");
      toast.success("Berhasil logout.");
    } catch (e) {
      console.error(e);
      toast.error("Gagal logout. Coba lagi.");
    }
    setIsLogoutModalOpen(false);
    setIsLoggedIn(false);
    window.location.href = "/auth/login";
  };

  const NAV_HEIGHT = 80;
  const CATEGORIES_HEIGHT = 56;
  const TOTAL_HEIGHT = NAV_HEIGHT + CATEGORIES_HEIGHT;

  useEffect(() => {
    if (typeof window === "undefined") return;
    lastScrollY.current = window.scrollY || 0;

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY || 0;
          const delta = currentY - lastScrollY.current;
          const THRESHOLD = 8; // mencegah jitter kecil

          if (Math.abs(delta) > THRESHOLD) {
            if (delta > 0 && currentY > 60) {
              // scroll ke bawah => sembunyikan header
              setVisible(false);
            } else if (delta < 0) {
              // scroll ke atas => tampilkan header
              setVisible(true);
            }
            lastScrollY.current = currentY;
          }

          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* FIXED HEADER: navbar + categories sebagai satu unit */}
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-transform duration-300 ease-in-out`}
        style={{
          // translateY untuk hide/show seluruh header
          transform: visible
            ? "translateY(0)"
            : `translateY(-${TOTAL_HEIGHT}px)`,
          // set tinggi total agar internal tidak kempes
          height: `${TOTAL_HEIGHT}px`,
        }}
      >
        {/* NAVBAR */}
        <div
          className="relative flex justify-center items-center border-b px-20 bg-putih z-9999"
          style={{ height: `${NAV_HEIGHT}px` }}
        >
          <div className="absolute left-20">
            <a
              href="/profile"
              className="flex items-center gap-2 text-[#363231] hover:text-oren transition-colors duration-200 cursor-pointer"
            >
              <FaRegUserCircle size={28} />
              <span className="font-medium hidden md:block">Profile</span>
            </a>
          </div>

          <a
            href="/"
            className="flex font-playfair justify-center items-center font-bold text-[32px] space-x-4 hover:cursor-pointer"
          >
            <div>Singkat</div>
            <LogoSingkatSajak className="text-[#363231] w-10" />
            <div>Sajak</div>
          </a>

          <div className="absolute right-20">
            {/* pass state agar LoginButton bisa men-trigger logout */}
            <LoginButton
              isInHamburger={false}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              onLogoutRequest={handleLogoutRequest}
            />
          </div>
        </div>

        {/* CATEGORIES */}
        <div
          className="flex justify-center items-center border-b bg-putih/95 backdrop-blur-sm"
          style={{ height: `${CATEGORIES_HEIGHT}px`, zIndex: 50 }}
        >
          <div className="flex justify-center items-center gap-6 max-w-[1200px] w-full px-6">
            {CATEGORIES.map((item, index) => (
              <a
                key={index}
                style={{
                  paddingInline: "clamp(4px, 2.5vw, 100px)",
                  "--hoverColor": item.themeColor,
                }}
                href={item.href}
                className={`flex justify-center py-3 uppercase text-[12px] lg:text-[16px] font-medium text-nowrap border-b-4 border-transparent hover:cursor-pointer transition-colors duration-200 ease-in-out hover:text-(--hoverColor) hover:border-(--hoverColor)`}
              >
                <div>{item.name}</div>
              </a>
            ))}
          </div>
        </div>
      </header>

      <div style={{ height: `${TOTAL_HEIGHT}px` }} aria-hidden="true" />

      <Modal
        isOpen={isLogoutModalOpen}
        title={
          <>
            <div>Konfirmasi Logout</div>
            <p className="mt-2 text-base font-medium">
              Apakah Anda yakin ingin logout sekarang?
            </p>
          </>
        }
        onConfirm={handleConfirmLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
    </>
  );
});
