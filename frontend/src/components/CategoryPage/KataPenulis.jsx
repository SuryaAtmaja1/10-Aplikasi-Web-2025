"use client";
import React from "react";
import dynamic from "next/dynamic";

const QuoteAlam = dynamic(
  () => import("./QuoteSection/QuoteAlam").then((m) => m?.default ?? m?.QuoteAlam),
  { ssr: false }
);
const QuoteTeknologi = dynamic(
  () => import("./QuoteSection/QuoteTeknologi").then((m) => m?.default ?? m?.QuoteTeknologi),
  { ssr: false }
);
const QuoteLokal = dynamic(
  () => import("./QuoteSection/QuoteLokal").then((m) => m?.default ?? m?.QuoteLokal),
  { ssr: false }
);
const QuoteSosial = dynamic(
  () => import("./QuoteSection/QuoteSosial").then((m) => m?.default ?? m?.QuoteSosial),
  { ssr: false }
);
const QuoteEkonomi = dynamic(
  () => import("./QuoteSection/QuoteEkonomi").then((m) => m?.default ?? m?.QuoteEkonomi),
  { ssr: false }
);
const QuotePolitik = dynamic(
  () => import("./QuoteSection/QuotePolitik").then((m) => m?.default ?? m?.QuotePolitik),
  { ssr: false }
);

export const KataPenulis = ({ category }) => {
  switch (category) {
    case "sosial":
      return <QuoteSosial />;
    case "alam":
      return <QuoteAlam />;
    case "lokal":
      return <QuoteLokal />;
    case "teknologi":
      return <QuoteTeknologi />;
    case "ekonomi":
      return <QuoteEkonomi />;
    case "politik":
      return <QuotePolitik />;
    default:
      return null;
  }
};
