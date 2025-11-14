import React from "react";
import { notFound, redirect } from "next/navigation";
import { CATEGORIES, CATEGORY_MAP } from "@/data/categories";
import { HeroSajak } from "@/components/CategoryPage/HeroSajak";
import LatestSectionPage from "@/components/CategoryPage/LatestSection/LatestSectionPage";
import PopularSectionPage from "@/components/CategoryPage/PopularSection/PopularSectionPage";

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
      <div className="flex flex-col md:items-center lg:flex-row lg:items-stretch gap-9 px-[4.17vw]">
        <div className="flex lg:max-w-2/3 ">
          <LatestSectionPage />
        </div>
        <div className="min-w-0.5 lg:self-stretch bg-[#363231]" />
        <div className="flex">
          <PopularSectionPage />
        </div>
      </div>
    </div>
  );
}
