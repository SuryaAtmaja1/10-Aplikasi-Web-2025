export const CATEGORIES = [
  {
    name: "Semua Sajak",
    slug: "semua",
    href: "/sajak",
    themeColor: "",
    alterColor: "",
    imgBackground: "",
    isIndex: false,
  },
  {
    name: "Alam",
    slug: "alam",
    href: "/sajak/alam",
    themeColor: "#09814A",
    alterColor: "#d1345b",
    imgBackground: "alam-bg.png",
  },
  {
    name: "Lokal",
    slug: "lokal",
    href: "/sajak/lokal",
    themeColor: "#fa7921",
    alterColor: "#363231",
    imgBackground: "lokal-bg.png",
  },
  {
    name: "Politik",
    slug: "politik",
    href: "/sajak/politik",
    themeColor: "#363231",
    alterColor: "#d1345b",
    imgBackground: "alam-bg.png",
  },
  {
    name: "Sosial",
    slug: "sosial",
    href: "/sajak/sosial",
    themeColor: "#d1345b",
    alterColor: "#363231",
    imgBackground: "sosial-bg.png",
  },
  {
    name: "Ekonomi",
    slug: "ekonomi",
    href: "/sajak/ekonomi",
    themeColor: "#09814a",
    alterColor: "#473bf0",
    imgBackground: "ekonomi-bg.png",
  },
  {
    name: "Teknologi",
    slug: "teknologi",
    href: "/sajak/teknologi",
    themeColor: "#473bf0",
    alterColor: "#d1345b",
    imgBackground: "teknologi-bg.png",
  },
];
export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c])
);

export const CATEGORY_SLUGS_FOR_ROUTES = CATEGORIES.filter(
  (c) => !c.isIndex
).map((c) => c.slug);
