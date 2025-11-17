"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function MaybeNavbar() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);
  if (!mounted || !pathname) return null;

  const hidePrefixes = ["/auth", "/profile/edit", "/sajak/edit", "/sajak/post"];
  if (hidePrefixes.some((prefix) => pathname.startsWith(prefix))) return null;

  return <Navbar />;
}
