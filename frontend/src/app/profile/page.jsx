"use client";

import React, { useEffect, useState } from "react";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import SajakList from "@/components/Profile/SajakList";
import FloatingCreateButton from "@/components/Profile/FloatingCreateButton";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [sajaks, setSajaks] = useState([]);

  // Mock data untuk testing UI tanpa backend
  const mockUser = {
    _id: "mock-user-id",
    username: "username",
    name: "Nama Pengguna",
    profilePhoto: null,
    bio: "Penulis sajak tentang kehidupan dan alam",
    createdAt: new Date("2024-06-01"),
  };

  const mockSajaks = [
    {
      _id: "1",
      title: "Judul Sajak 1",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      createdAt: new Date("2024-10-01"),
      commentsCount: 4,
      likes: 20,
    },
    {
      _id: "2",
      title: "Judul Sajak 2",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      createdAt: new Date("2024-09-15"),
      commentsCount: 8,
      likes: 35,
    },
    {
      _id: "3",
      title: "Judul Sajak 3",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      createdAt: new Date("2024-08-20"),
      commentsCount: 2,
      likes: 15,
    },
    {
      _id: "4",
      title: "Judul Sajak 4",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      createdAt: new Date("2024-07-10"),
      commentsCount: 6,
      likes: 28,
    },
  ];

  useEffect(() => {
    // Simulasi pengambilan data (mock)
    const t = setTimeout(() => {
      setUser(mockUser);
      setSajaks(mockSajaks);
    }, 300);

    return () => clearTimeout(t);
  }, []);

  function formatJoinDate(dateString) {
    const date = new Date(dateString);
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  }

  // Jika belum ada user, tampilkan saja halaman kosong (tanpa loading)
  if (!user) {
    return (
      <div className="min-h-screen bg-[#FFF9F4] flex items-center justify-center">
        <p className="text-[#363231]">Memuat data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9F4]">
      <div className="flex flex-col">
        <ProfileHeader user={user} formatJoinDate={formatJoinDate} />

        {/* Section Title */}
        <div className="w-full border-b-[0.5px] border-hitam flex flex-col items-center justify-center  py-5 md:py-10 mb-4 md:mb-8 md:mt-6">
          <h2 className="font-jakarta text-3xl md:text-5xl leading-6 font-bold text-[#363231] text-center underline underline-offset-8 decoration-cerise">
            SEMUA SAJAK
          </h2>
        </div>

        {/* Sajak Section */}
        <div className="px-4 md:px-8 lg:px-20 pb-8 relative">
          <SajakList sajaks={sajaks} />
          <FloatingCreateButton />
        </div>
      </div>
    </div>
  );
}
