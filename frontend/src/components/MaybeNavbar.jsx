"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";

export default function MaybeNavbar() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  if (!pathname) return null;

  useEffect(() => setMounted(true), []);
  if (pathname.startsWith("/auth")) return null;

  return <Navbar />;
}
