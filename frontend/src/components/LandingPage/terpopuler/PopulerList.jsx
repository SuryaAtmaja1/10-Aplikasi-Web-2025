"use client";
import React from "react";
import Image from "next/image";
import WhiteBox from "@/components/CategoryPage/ChoiceSection/WhiteBox";
import RomanBath from "../../../../public/assets/landing/roman_bath.png";
import { useEffect, useState } from "react";
import PageLoading from "@/components/PageLoading";
import api from "@/utils/axiosInstance";

export default function PopulerList() {
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSajakAndAuthors() {
      try {
        const res = await api.get("/sajak/trending");
        const sajakList = res.data.data;

        const authorIds = [...new Set(sajakList.map((s) => s.authorId))];

        const userRequests = authorIds.map((id) => api.get(`/user/${id}`));
        const userResponses = await Promise.all(userRequests);

        const authorMap = {};
        userResponses.forEach((res) => {
          authorMap[res.data._id] = res.data;
        });

        const merged = sajakList.map((item) => ({
          ...item,
          author: authorMap[item.authorId] || null,
        }));
        setTrendingPosts(merged);
      } catch (err) {
        console.error(
          "Gagal mengambil sajak terbaru:",
          err?.response?.data || err
        );
      } finally {
        setLoading(false);
      }
    }

    fetchSajakAndAuthors();
  }, []);
  if (loading) return <PageLoading message="Memuat konten terbaru..." />;

  console.log("trendingPosts:", trendingPosts[0]?.hashtags[0]);
  return (
    <div className="w-full flex flex-col items-center md:flex-row md:justify-center gap-6">
      <Image
        src={RomanBath}
        className="absolute mt-[15vh] md:mt-0 [clip-path:polygon(0%_22%,100%_22%,100%_78%,0%_78%)] opacity-67 transform transition duration-500"
        width={1920}
        height={704}
        alt="RomanBath"
      />

      <div className="md:hidden flex flex-col items-center gap-7">
        <WhiteBox
          href={
            "sajak/" +
            trendingPosts[0]?.hashtags[0] +
            "/" +
            trendingPosts[0]?._id
          }
          isPhone={true}
          title={trendingPosts[0]?.title}
          author={trendingPosts[0]?.author?.username}
        />
        <div className="flex flex-row justify-center gap-12">
          <WhiteBox
            href={
              "sajak/" +
              trendingPosts[1]?.hashtags[1] +
              "/" +
              trendingPosts[1]?._id
            }
            isPhone={true}
            title={trendingPosts[1]?.title}
            author={trendingPosts[1]?.author?.username}
          />
          <WhiteBox
            href={
              "sajak/" +
              trendingPosts[2]?.hashtags[2] +
              "/" +
              trendingPosts[2]?._id
            }
            isPhone={true}
            title={trendingPosts[2]?.title}
            author={trendingPosts[2]?.author?.username}
          />
        </div>
      </div>
      <div className="hidden md:flex flex-row gap-20">
        <WhiteBox
          href={
            "sajak/" +
            trendingPosts[0]?.hashtags[0] +
            "/" +
            trendingPosts[0]?._id
          }
          isPhone={false}
          title={trendingPosts[0]?.title}
          author={trendingPosts[0]?.author?.username}
        />
        <WhiteBox
          href={
            "sajak/" +
            trendingPosts[1]?.hashtags[1] +
            "/" +
            trendingPosts[1]?._id
          }
          isPhone={false}
          title={trendingPosts[1]?.title}
          author={trendingPosts[1]?.author?.username}
        />
        <WhiteBox
          href={
            "sajak/" +
            trendingPosts[2]?.hashtags[2] +
            "/" +
            trendingPosts[2]?._id
          }
          isPhone={false}
          title={trendingPosts[2]?.title}
          author={trendingPosts[2]?.author?.username}
        />
      </div>
    </div>
  );
}
