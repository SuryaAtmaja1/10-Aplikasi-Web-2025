import React from "react";
import { notFound, redirect } from "next/navigation";
import { CATEGORIES, CATEGORY_MAP } from "@/data/categories";
import CategoryClient from "./CategoryClient";

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export default async function Page({ params }) {
  const { category } = await params;

  if (!category) return notFound();

  const cfg = CATEGORY_MAP[category];
  if (!cfg) return notFound();

  if (category === "semua") {
    redirect("/sajak");
  }
  return <CategoryClient />;
}
