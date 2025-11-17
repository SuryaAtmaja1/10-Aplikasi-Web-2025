"use client";

import React, { useState } from "react";
import api from "@/utils/axiosInstance";

export default function LoginButton({
  isInHamburger = false,
  className = "",
  children = "Log In",
  isLoggedIn,
  setIsLoggedIn,
  onLogoutRequest,
  ...rest
}) {
  const [loading, setLoading] = useState(false);

  const base =
    "flex items-center justify-center py-3 px-6 rounded-[20px] hover:cursor-pointer transition-colors";
  const desktopStyle =
    "bg-[#363231] hover:bg-[#4A4442] text-[#FFF9F4] font-bold text-[16px]";
  const hamburgerStyle =
    "w-full bg-hitam hover:bg-[#4A4442] text-[#FFF9F4] font-bold text-[16px]";

  const finalClass = `${base} ${
    isInHamburger ? hamburgerStyle : desktopStyle
  } ${className}`.trim();

  // ==========================
  //          LOGOUT
  // ==========================
  if (isLoggedIn) {
    const handleLogout = async () => {
      if (typeof onLogoutRequest === "function") {
        onLogoutRequest();
        return;
      }
      setLoading(true);
      try {
        await api.post("/auth/logout");
        setIsLoggedIn(false);
      } catch (err) {
        console.error(err);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    return (
      <button
        type="button"
        onClick={handleLogout}
        disabled={loading}
        className={finalClass}
        aria-label="Logout"
      >
        <span>{loading ? "Logging out..." : "Logout"}</span>
      </button>
    );
  }

  // ==========================
  //           LOGIN
  // ==========================
  return (
    <a href="/auth/login" className={finalClass} aria-label="Login">
      <span>{children}</span>
    </a>
  );
}
