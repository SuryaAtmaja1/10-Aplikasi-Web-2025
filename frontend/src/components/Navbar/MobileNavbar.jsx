"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { CATEGORIES } from "@/data/categories";
import LogoSingkatSajak from "../../../public/assets/LogoSingkatSajak";
import dynamic from "next/dynamic";
import LoginButton from "./LoginButton";
import { FaRegUserCircle } from "react-icons/fa";
import api from "@/utils/axiosInstance";
import Modal from "../Modal";

const BsJustify = dynamic(
  () => import("react-icons/bs").then((mod) => mod.BsJustify),
  { ssr: false }
);

export const MobileNavbar = React.memo(function MobileNavbar() {
  const [open, setOpen] = useState(false);
  const toggleOpen = useCallback(() => setOpen((v) => !v), []);
  const closeMenu = useCallback(() => setOpen(false), []);

  // auth state (added to mirror DesktopNavbar behavior)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutRequest = () => {
    // close menu first so modal appears on top cleanly
    setOpen(false);
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (e) {
      console.error(e);
    }
    setIsLogoutModalOpen(false);
    setIsLoggedIn(false);
    // redirect to login page
    window.location.href = "/auth/login";
  };

  // check login on mount (same logic as DesktopNavbar)
  useEffect(() => {
    let mounted = true;
    const checkLogin = async () => {
      try {
        const res = await api.post("/auth/refresh-token");
        if (!mounted) return;
        if (
          res?.data &&
          (res.data.user || res.data.loggedIn || res.status === 200)
        ) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        if (!mounted) return;
        setIsLoggedIn(false);
      }
    };

    checkLogin();
    return () => {
      mounted = false;
    };
  }, []);

  // Scroll hide/show behavior
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const NAV_HEIGHT = 64; // h-16 = 64px

  useEffect(() => {
    if (typeof window === "undefined") return;
    lastScrollY.current = window.scrollY || 0;

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY || 0;
          const delta = currentY - lastScrollY.current;
          const THRESHOLD = 6;

          // jika menu terbuka, jangan sembunyikan header agar menu tetap bisa diakses
          if (open) {
            setVisible(true);
            lastScrollY.current = currentY;
            ticking.current = false;
            return;
          }

          if (Math.abs(delta) > THRESHOLD) {
            if (delta > 0 && currentY > 40) {
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
  }, [open]);

  return (
    <>
      {/* FIXED MOBILE HEADER */}
      <header
        className="fixed left-0 right-0 top-0 z-9999 transition-transform duration-300 ease-in-out md:hidden"
        style={{
          transform: visible ? "translateY(0)" : `translateY(-${NAV_HEIGHT}px)`,
          height: `${NAV_HEIGHT}px`,
        }}
      >
        <div className="flex items-center justify-between px-4 border-b h-16 bg-putih">
          <div className="flex items-center space-x-3">
            {/* Brand only on header (profile moved into menu) */}
            <div className="flex font-playfair items-center font-bold text-[18px] space-x-2 hover:cursor-pointer">
              <div>Singkat</div>
              <LogoSingkatSajak className="text-hitam w-6" />
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

        {/* MOBILE MENU (slide down) */}
        {open && (
          <nav
            id="mobile-menu"
            className="absolute left-0 right-0 top-16 z-9999 bg-putih border-b shadow-md animate-slide-down"
            role="menu"
            style={{ height: "calc(100vh - 4rem)" }}
          >
            <div className="flex flex-col justify-between h-full bg-putih">
              {/* Top: Profile */}
              <div className="px-4 pt-4">
                <a
                  href="/profile"
                  onClick={closeMenu}
                  className="flex items-center gap-3 py-3 px-2 rounded-md hover:bg-[#FFEAC7] transition-colors"
                  role="menuitem"
                >
                  <FaRegUserCircle size={22} />
                  <div className="text-left">
                    <div className="font-medium text-sm">Profile</div>
                    <div className="text-xs text-slate-500">
                      Lihat dan sunting profil
                    </div>
                  </div>
                </a>
              </div>

              {/* Middle: Categories (DIUBAH -> center) */}
              <div className="px-4 py-4 overflow-auto flex-1 flex flex-col items-center">
                <div className="w-full max-w-[480px] space-y-2">
                  {CATEGORIES.map((cat) => (
                    <a
                      key={cat.id ?? cat.name}
                      role="menuitem"
                      href={cat.href}
                      onClick={closeMenu}
                      className="block w-full text-center border-b border-hitam py-3 uppercase text-sm font-medium active:text-oren active:bg-[#FFF6E8] active:bg-[#FFD08A] transition-colors"
                    >
                      {cat.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Bottom: Login */}
              <div className="px-4 py-4 border-t">
                <LoginButton
                  isInHamburger={true}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  onLogoutRequest={() => {
                    handleLogoutRequest();
                  }}
                  // tambahkan onClick closeMenu agar klik internal (login) tetap menutup menu bila perlu
                  onClick={closeMenu}
                  className="flex justify-center"
                />
              </div>
            </div>
          </nav>
        )}
      </header>

      {/* SPACER supaya konten tidak 'naik' di bawah header fixed */}
      <div style={{ height: `${NAV_HEIGHT}px` }} aria-hidden="true" />

      {/* Logout confirmation modal (mirip DesktopNavbar) */}
      <Modal
        isOpen={isLogoutModalOpen}
        title="Konfirmasi Logout"
        onYes={handleConfirmLogout}
        onNo={() => setIsLogoutModalOpen(false)}
        onClose={() => setIsLogoutModalOpen(false)}
      >
        <p>Apakah Anda yakin ingin logout sekarang?</p>
      </Modal>
    </>
  );
});
