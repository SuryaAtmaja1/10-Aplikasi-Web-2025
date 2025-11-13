"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  FiEdit3, 
  FiTrash2, 
  FiMapPin, 
  FiClock, 
  FiMessageCircle, 
  FiHeart,
  FiPlus 
} from "react-icons/fi";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [sajaks, setSajaks] = useState([]);
  const [loading, setLoading] = useState(true);

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
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      createdAt: new Date("2024-10-01"),
      commentsCount: 4,
      likes: 20,
    },
    {
      _id: "2",
      title: "Judul Sajak 2",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      createdAt: new Date("2024-09-15"),
      commentsCount: 8,
      likes: 35,
    },
    {
      _id: "3",
      title: "Judul Sajak 3",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      createdAt: new Date("2024-08-20"),
      commentsCount: 2,
      likes: 15,
    },
    {
      _id: "4",
      title: "Judul Sajak 4",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      createdAt: new Date("2024-07-10"),
      commentsCount: 6,
      likes: 28,
    },
  ];

  useEffect(() => {
    // Simulasi loading
    setTimeout(() => {
      // Gunakan mock data untuk testing UI
      setUser(mockUser);
      setSajaks(mockSajaks);
      setLoading(false);
    }, 500);

    // Uncomment untuk pakai backend (kalau backend sudah ready)
    /*
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          // Fallback ke mock data jika backend error
          setUser(mockUser);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        // Fallback ke mock data jika backend error
        setUser(mockUser);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserSajaks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/sajak/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setSajaks(data.sajak || data || []);
        } else {
          // Fallback ke mock data jika backend error
          setSajaks(mockSajaks);
        }
      } catch (error) {
        console.error("Error fetching sajaks:", error);
        // Fallback ke mock data jika backend error
        setSajaks(mockSajaks);
      }
    };

    fetchUserData();
    fetchUserSajaks();
    */
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    return `${date.getDate().toString().padStart(2, '0')} ${months[date.getMonth()]}`;
  };

  const formatJoinDate = (dateString) => {
    const date = new Date(dateString);
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const handleDelete = async (sajakId) => {
    if (confirm("Apakah lo yakin ingin menghapus sajak ini?")) {
      // Untuk mock data, langsung hapus dari state
      setSajaks(sajaks.filter((s) => s._id !== sajakId));
      
      // Uncomment untuk pakai backend (kalau backend sudah ready)
      /*
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/sajak/${sajakId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          setSajaks(sajaks.filter((s) => s._id !== sajakId));
        }
      } catch (error) {
        console.error("Error deleting sajak:", error);
      }
      */
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF9F4] flex items-center justify-center">
        <div className="text-[#363231]">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FFF9F4] flex items-center justify-center">
        <div className="text-[#363231]">User tidak ditemukan</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9F4]">
      {/* Main Content */}
      <div className="flex flex-col">
        <div className="px-4 md:px-8 lg:px-20 py-4 md:py-8">
          {/* Profile Section */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-6 md:mb-12">
            {/* Left: Avatar and Name (Mobile/Desktop) */}
            <div className="flex flex-row md:flex-col gap-4 md:gap-0 items-center md:items-start flex-shrink-0">
              {user.profilePhoto ? (
                <img
                  src={user.profilePhoto}
                  alt={user.username}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover bg-[#363231]"
                />
              ) : (
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#363231] flex items-center justify-center">
                  <svg
                    className="w-12 h-12 md:w-16 md:h-16 text-[#FFF9F4]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0A7 7 0 013 16z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
              
              {/* Name and Username - Inline on mobile */}
              <div className="md:hidden flex-1">
                <h2 className="text-2xl font-bold text-[#363231] mb-1">
                  {user.name || user.username}
                </h2>
                <p className="text-base text-[#363231] mb-2">@{user.username}</p>
                <div className="flex items-center gap-2 text-[#363231] text-sm">
                  <FiMapPin className="w-4 h-4" />
                  <span>Yogyakarta, Indonesia</span>
                </div>
              </div>
            </div>

            {/* Middle: Name, Username, Location (Desktop only) */}
            <div className="hidden md:block flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-[#363231] mb-2">
                {user.name || user.username}
              </h2>
              <p className="text-lg text-[#363231] mb-3">@{user.username}</p>
              <div className="flex items-center gap-2 text-[#363231] mb-6">
                <FiMapPin className="w-5 h-5" />
                <span>Yogyakarta, Indonesia</span>
              </div>
            </div>

            {/* Right: Bio, Join Date, Edit Button */}
            <div className="flex-1 md:border-l border-[#363231] md:pl-8 pt-4 md:pt-0">
              <p className="text-[#363231] text-base mb-3">
                {user.bio || "Penulis sajak tentang kehidupan dan alam"}
              </p>
              <p className="text-[#363231] text-base mb-4">
                Bergabung: {formatJoinDate(user.createdAt)}
              </p>
              <Link href="/profile/edit">
                <button className="bg-[#FA7921] hover:bg-[#E86A1A] text-white font-bold py-2.5 px-5 rounded-lg transition-colors text-base">
                  Edit Profil
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Articles Section with Full Width Border */}
        <div className="w-full border-b-[0.5px] border-[#000] flex flex-col items-center justify-center py-5 md:py-7 mb-4 md:mb-8">
          <h2 className="font-jakarta text-[25px] leading-6 font-medium text-[#363231] text-center">
            SEMUA SAJAK
          </h2>
        </div>

        <div className="px-4 md:px-8 lg:px-20 pb-8 relative">
          {/* Articles List */}
          <div className="flex flex-col gap-8 md:gap-12">
              {sajaks.length > 0 ? (
                sajaks.map((sajak) => (
                  <article key={sajak._id} className="flex flex-col">
                    {/* Title and Action Buttons */}
                    <div className="flex items-start justify-between gap-3 md:gap-6 mb-4 md:mb-6">
                      <h3 className="font-instrument font-normal text-4xl md:text-5xl text-[#363231] flex-1 leading-tight">
                        {sajak.title}
                      </h3>
                      <div className="flex gap-3 flex-shrink-0 pt-2">
                        <Link href={`/sajak/edit/${sajak._id}`}>
                          <button 
                            className="text-[#363231] hover:text-[#FA7921] transition-all duration-200 p-1 hover:scale-110 active:scale-95 rounded-md hover:bg-[#FA7921]/10"
                            aria-label="Edit sajak"
                          >
                            <svg 
                              width="28" 
                              height="28" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2.5" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            >
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(sajak._id)}
                          className="text-[#363231] hover:text-[#D1345B] transition-all duration-200 p-1 hover:scale-110 active:scale-95 rounded-md hover:bg-[#D1345B]/10"
                          aria-label="Delete sajak"
                        >
                          <svg 
                            width="28" 
                            height="28" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          >
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Description/Content */}
                    <p className="font-jakarta font-normal text-base md:text-lg leading-relaxed text-[#363231] mb-4 md:mb-6">
                      {sajak.content.length > 150 
                        ? `${sajak.content.substring(0, 150)}...` 
                        : sajak.content}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 md:gap-8 text-[#363231]">
                      {/* Date */}
                      <div className="flex items-center gap-2 md:gap-3">
                        <svg 
                          width="24" 
                          height="24" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2.5" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span className="text-sm md:text-base font-jakarta font-normal">
                          {formatDate(sajak.createdAt)}
                        </span>
                      </div>

                      {/* Comments */}
                      <button 
                        className="flex items-center gap-2 md:gap-3 text-[#363231] hover:text-[#473BF0] transition-all duration-200 hover:scale-110 active:scale-95 rounded-md px-1 py-0.5 hover:bg-[#473BF0]/10 group"
                        onClick={() => {
                          // TODO: Navigate to comments or open comment modal
                          console.log('Open comments for:', sajak._id);
                        }}
                      >
                        <svg 
                          width="24" 
                          height="24" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2.5" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          className="transition-transform duration-200 group-hover:rotate-12"
                        >
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        <span className="text-sm md:text-base font-jakarta font-normal">{sajak.commentsCount || 0}</span>
                      </button>

                      {/* Likes */}
                      <button 
                        className="flex items-center gap-2 md:gap-3 text-[#363231] hover:text-[#D1345B] transition-all duration-200 hover:scale-110 active:scale-95 rounded-md px-1 py-0.5 hover:bg-[#D1345B]/10 group"
                        onClick={() => {
                          // TODO: Toggle like functionality
                          console.log('Toggle like for:', sajak._id);
                        }}
                      >
                        <svg 
                          width="24" 
                          height="24" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2.5" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          className="transition-all duration-200 group-hover:fill-[#D1345B] group-active:scale-125 group-active:animate-pulse"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        <span className="text-sm md:text-base font-jakarta font-normal group-hover:font-semibold transition-all duration-200">{sajak.likes || 0}</span>
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <div className="text-center text-[#363231] py-12">
                  <p className="font-jakarta text-lg">Belum ada sajak yang dipublikasikan.</p>
                </div>
              )}
            </div>

          {/* Create New Article Button */}
          <div className="fixed bottom-8 right-4 md:right-8 flex items-center gap-4 z-50">
            
            <Link href="/sajak/post">
              <button className="w-14 h-14 md:w-16 md:h-16 bg-[#363231] hover:bg-[#4A4442] text-white rounded-full flex items-center justify-center shadow-lg transition-colors flex-shrink-0">
                <FiPlus className="w-7 h-7 md:w-8 md:h-8" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

