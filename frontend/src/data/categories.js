export const CATEGORIES = [
  {
    name: "Semua Sajak",
    slug: "semua",
    href: "/sajak",
    themeColor: "",
    isIndex: false,
  },
  {
    name: "Alam",
    slug: "alam",
    href: "/sajak/alam",
    themeColor: "#09814A",
  },
  {
    name: "Lokal",
    slug: "lokal",
    href: "/sajak/lokal",
    themeColor: "#fa7921",
  },
  {
    name: "Politik",
    slug: "politik",
    href: "/sajak/politik",
    themeColor: "#363231",
  },
  {
    name: "Sosial",
    slug: "sosial",
    href: "/sajak/sosial",
    themeColor: "#d1345b",
  },
  {
    name: "Ekonomi",
    slug: "ekonomi",
    href: "/sajak/ekonomi",
    themeColor: "#09814a",
  },
  {
    name: "Teknologi",
    slug: "teknologi",
    href: "/sajak/teknologi",
    themeColor: "#473bf0",
  },
];
export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c])
);

export const CATEGORY_SLUGS_FOR_ROUTES = CATEGORIES.filter(
  (c) => !c.isIndex
).map((c) => c.slug);
