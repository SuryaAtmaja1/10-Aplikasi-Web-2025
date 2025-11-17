"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

export default function MaybeFooter() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);
  if (!pathname) return null;
  if (pathname.startsWith("/auth")) return null;
  return <Footer />;
}
