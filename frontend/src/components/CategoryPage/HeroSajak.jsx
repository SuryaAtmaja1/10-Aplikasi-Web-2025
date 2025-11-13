"use client";
import React from "react";
import dynamic from "next/dynamic";

const SosialHero = dynamic(
  () => import("./heroes/SosialHero").then((m) => m?.default ?? m?.SosialHero),
  { ssr: false }
);
const AlamHero = dynamic(
  () => import("./heroes/AlamHero").then((m) => m?.default ?? m?.AlamHero),
  { ssr: false }
);
const LokalHero = dynamic(
  () => import("./heroes/LokalHero").then((m) => m?.default ?? m?.LokalHero),
  { ssr: false }
);
const TeknologiHero = dynamic(
  () =>
    import("./heroes/TeknologiHero").then(
      (m) => m?.default ?? m?.TeknologiHero
    ),
  { ssr: false }
);
const EkonomiHero = dynamic(
  () =>
    import("./heroes/EkonomiHero").then((m) => m?.default ?? m?.EkonomiHero),
  { ssr: false }
);
const PolitikHero = dynamic(
  () =>
    import("./heroes/PolitikHero").then((m) => m?.default ?? m?.PolitikHero),
  { ssr: false }
);

export const HeroSajak = ({ category }) => {
  switch (category) {
    case "sosial":
      return <SosialHero />;
    case "alam":
      return <AlamHero />;
    case "lokal":
      return <LokalHero />;
    case "teknologi":
      return <TeknologiHero />;
    case "ekonomi":
      return <EkonomiHero />;
    case "politik":
      return <PolitikHero />;
    default:
      return null;
  }
};
