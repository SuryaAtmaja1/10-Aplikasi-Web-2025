import React from "react";
import { notFound, redirect } from "next/navigation";
import { CATEGORIES, CATEGORY_MAP } from "@/data/categories";
import { HeroSajak } from "@/components/CategoryPage/HeroSajak";
import { LatestContainer } from "@/components/CategoryPage/LatestSection/LatestContainer";

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export default async function Page({ params }) {
  const { category } = await params;
  if (!category) notFound();

  const cfg = CATEGORY_MAP[category];
  if (!cfg) notFound();

  if (category === "semua") {
    redirect("/sajak");
  }

  return (
    <div>
      <HeroSajak category={category} />
      <LatestContainer />
    </div>
  );
}
