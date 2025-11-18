"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { CATEGORY_MAP } from "@/data/categories";
import api from "@/utils/axiosInstance";
import { HeroSajak } from "@/components/CategoryPage/HeroSajak";
import LatestSectionPage from "@/components/CategoryPage/LatestSection/LatestSectionPage";
import PopularSectionPage from "@/components/CategoryPage/PopularSection/PopularSectionPage";
import ChoiceSection from "@/components/CategoryPage/ChoiceSection/ChoiceSection";
import { KataPenulis } from "@/components/CategoryPage/KataPenulis";
import PageLoading from "@/components/PageLoading";

export default function CategoryClient() {
  const params = useParams();
  const router = useRouter();
  const category = params?.category;

  const cfg = category ? CATEGORY_MAP[category] : null;

  const [sajakList, setSajakList] = React.useState([]);
  const [loadingLatest, setLoadingLatest] = React.useState(true);

  const [trendingList, setTrendingList] = React.useState([]);
  const [loadingTrending, setLoadingTrending] = React.useState(true);

  // simple in-memory cache for fetched users in this component lifecycle
  const userCacheRef = React.useRef({}); // { [id]: { _id, username, name, ... } }

  React.useEffect(() => {
    if (!category) {
      router.replace("/sajak");
    } else if (!cfg) {
      router.replace("/sajak");
    } else if (category === "semua") {
      router.replace("/sajak");
    }
  }, [category, cfg, router]);

  // helper: given an array of sajak items, ensure they have authorName
  // returns new array (does not mutate original)
  async function attachAuthorNames(items, mounted) {
    if (!Array.isArray(items)) return [];

    // collect unique author ids (skip falsy)
    const authorIds = Array.from(
      new Set(
        items
          .map((it) => {
            // author can be _id string or populated object
            if (!it) return null;
            if (typeof it.authorId === "string") return it.authorId;
            if (it.authorId && typeof it.authorId === "object")
              return it.authorId._id ?? it.authorId.id;
            // fallback: maybe `author` field contains id or name
            return null;
          })
          .filter(Boolean)
      )
    );

    // check which ids we still need to fetch
    const idsToFetch = authorIds.filter((id) => !userCacheRef.current[id]);

    // fetch missing users in parallel
    if (idsToFetch.length > 0) {
      try {
        const promises = idsToFetch.map((id) =>
          api
            .get(`/user/${id}`)
            .then((r) => ({ id, data: r.data }))
            .catch((err) => {
              console.error("Gagal fetch user", id, err);
              return { id, data: null };
            })
        );
        const results = await Promise.all(promises);
        if (!mounted) return items.map((it) => ({ ...it })); // bail out safely

        // store in cache (only when data present)
        for (const res of results) {
          if (res.data) userCacheRef.current[res.id] = res.data;
        }
      } catch (err) {
        console.error("Error saat fetch authors:", err);
      }
    }

    // now map items to include authorName
    const mapped = items.map((it) => {
      if (!it) return it;
      let authorName = "Penulis";

      if (it.authorId && typeof it.authorId === "object") {
        // populated author object
        authorName =
          it.authorId.username ??
          it.authorId.name ??
          it.authorId.fullname ??
          authorName;
      } else if (typeof it.authorId === "string") {
        const cached = userCacheRef.current[it.authorId];
        if (cached) {
          authorName = cached.username ?? cached.name ?? authorName;
        } else {
          // if not cached (and not fetched for some reason), show the id as fallback
          authorName = it.authorId;
        }
      } else if (it.author) {
        authorName =
          typeof it.author === "string"
            ? it.author
            : it.author.name ?? authorName;
      }

      return {
        ...it,
        authorName,
      };
    });

    return mapped;
  }

  // fetch latest by tag and attach author names
  React.useEffect(() => {
    if (!category || !cfg) return;

    let mounted = true;
    async function fetchSajakByCategory() {
      try {
        setLoadingLatest(true);
        const res = await api.get(`/sajak/tag/${category}`);
        // res.data might be array OR { message, data: [...] }
        const arr =
          (res.data && Array.isArray(res.data.data) && res.data.data) ||
          (Array.isArray(res.data) && res.data) ||
          [];
        // console.log("🔍 SAJAK DARI CATEGORY (latest) raw:", res.data);

        // attach author names
        const withAuthors = await attachAuthorNames(arr, mounted);
        if (!mounted) return;
        setSajakList(withAuthors);
      } catch (err) {
        console.error("Gagal mengambil sajak berdasarkan tag (latest):", err);
        if (mounted) setSajakList([]);
      } finally {
        if (mounted) setLoadingLatest(false);
      }
    }

    fetchSajakByCategory();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, cfg]);

  // fetch trending by tag and attach author names
  React.useEffect(() => {
    if (!category || !cfg) return;

    let mounted = true;
    async function fetchTrendingByCategory() {
      try {
        setLoadingTrending(true);
        const res = await api.get(`/sajak/trending/tag/${category}`);
        // console.log("🔥 TRENDING RAW RESPONSE:", res.data);

        const trendingArray =
          (res.data && Array.isArray(res.data.data) && res.data.data) ||
          (Array.isArray(res.data) && res.data) ||
          [];

        // attach author names
        const withAuthors = await attachAuthorNames(trendingArray, mounted);
        if (!mounted) return;
        setTrendingList(withAuthors);
        // console.log("🔥 TRENDING NORMALIZED with authors:", withAuthors);
      } catch (err) {
        console.error("Gagal mengambil sajak trending:", err);
        if (mounted) setTrendingList([]);
      } finally {
        if (mounted) setLoadingTrending(false);
      }
    }

    fetchTrendingByCategory();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, cfg]);

  if (!cfg) return null;

  const themeColor = cfg.themeColor;
  const alterColor = cfg.alterColor;
  const backgroundImage = cfg.imgBackground;

  if (loadingLatest || loadingTrending) {
    return <PageLoading />;
  }

  return (
    <div>
      <HeroSajak category={category} />
      <div className="flex flex-col md:items-center lg:flex-row lg:items-stretch gap-9 px-[4.17vw] ">
        <div className="flex lg:max-w-2/3 lg:pb-20">
          <LatestSectionPage
            themeColor={themeColor}
            alterColor={alterColor}
            sajakList={sajakList}
            loading={loadingLatest}
          />
        </div>

        <div className="min-w-0.5 lg:self-stretch bg-[#363231]" />

        <div className="flex lg:pb-20">
          <PopularSectionPage
            themeColor={themeColor}
            trendingList={trendingList}
            loadingTrending={loadingTrending}
          />
        </div>
      </div>

      <ChoiceSection
        themeColor={themeColor}
        alterColor={alterColor}
        backgroundImage={backgroundImage}
        trendingList={trendingList}
        category={category}
      />
      <KataPenulis category={category} />
    </div>
  );
}
