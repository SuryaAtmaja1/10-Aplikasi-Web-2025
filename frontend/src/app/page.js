import React from "react";
import { LandingHero } from "@/components/LandingPage/LandingHero";
import { LandingTerbaru } from "@/components/LandingPage/LandingTerbaru";
import { AgendaKomunitas } from "@/components/LandingPage/AgendaKomunitas";
import { ReviewPenulis } from "@/components/LandingPage/ReviewPenulis";

export default function Home() {
  return (
    <div>
      <LandingHero />
      <LandingTerbaru />
      <div className="pb-30 bg-hitam">aaaaaaaa</div>
      <AgendaKomunitas />
      <ReviewPenulis />
      <div className="pb-30 bg-putih"> </div>
    </div>
  )
}
