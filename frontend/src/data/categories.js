export const CATEGORIES = [
  { name: "Semua Sajak", slug: "semua", href: "/sajak", isIndex: false },
  { name: "Alam", slug: "alam", href: "/sajak/alam" },
  { name: "Lokal", slug: "lokal", href: "/sajak/lokal" },
  { name: "Politik", slug: "politik", href: "/sajak/politik" },
  { name: "Sosial", slug: "sosial", href: "/sajak/sosial" },
  { name: "Ekonomi", slug: "ekonomi", href: "/sajak/ekonomi" },
  { name: "Teknologi", slug: "teknologi", href: "/sajak/teknologi" },
];
export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c])
);

export const CATEGORY_SLUGS_FOR_ROUTES = CATEGORIES.filter(
  (c) => !c.isIndex
).map((c) => c.slug);
