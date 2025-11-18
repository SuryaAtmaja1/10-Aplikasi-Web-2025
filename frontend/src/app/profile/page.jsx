"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/axiosInstance";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import SajakList from "@/components/Profile/SajakList";
import FloatingCreateButton from "@/components/Profile/FloatingCreateButton";
import toast from "react-hot-toast";
import PageLoading from "../loading";

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [sajaks, setSajaks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        setLoading(true);

        // 1) get current user
        const userRes = await api.get("/user", { withCredentials: true });
        // support different shapes: direct user object or wrapped in data
        const me = userRes.data?.data ?? userRes.data ?? null;

        if (!me) {
          // no user -> probably unauthorized
          if (mounted) setUser(null);
          return;
        }

        if (mounted) setUser(me);

        // 2) get sajaks by user id
        const sajakRes = await api.get(`/sajak/user/${me._id}`, { withCredentials: true });
        const list = sajakRes.data?.data ?? sajakRes.data ?? [];
        if (mounted) setSajaks(Array.isArray(list) ? list : []);
        } catch (err) {
        // Cek jika error dari Axios
        if (err.response) {
          // server merespons dengan status code selain 2xx
          // console.error("Server responded with error:", err.response.status, err.response.data);
          if (err.response.status === 401 && mounted) {
            setUser(null);
          }
        } else if (err.request) {
          // request dibuat tapi tidak ada respons
          console.error("No response received:", err.request);
        } else {
          // error lain (misal setup request, parsing, dll)
          console.error("Error setting up request:", err.message);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, [router]);

  // redirect to login with short message if not authenticated
  useEffect(() => {
    if (user === null && !loading) {
      const t = setTimeout(() => {
        router.push("/auth/login");
      }, 1500);

      return () => clearTimeout(t);
    }
  }, [user, loading, router]);

  // Format join date helper
  function formatJoinDate(dateString) {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember",
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  }

  // DELETE handler (calls backend + optimistic update + rollback)
  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus sajak ini?")) return;

    const prev = [...sajaks];
    setSajaks((p) => p.filter((s) => s._id !== id));

    try {
      await api.delete(`/sajak/${id}`, { withCredentials: true });
      
      toast.success("Sukses menghapus sajak.");
      // success: nothing else to do
    } catch (err) {
      console.error("Failed to delete:", err);
      toast.error("Gagal menghapus sajak. Silakan coba lagi.");
      setSajaks(prev); // rollback
    }
  };

  // LIKE handler (calls backend, tries specific like route then fallback to PATCH /sajak/:id)
  // const handleLike = async (id) => {
  //   const prev = [...sajaks];
  //   // optimistic increment
  //   setSajaks((p) => p.map((s) => (s._id === id ? { ...s, likes: (s.likes ?? 0) + 1 } : s)));

  //   try {
  //     // try dedicated like route
  //     try {
  //       const res = await api.patch(`/sajak/${id}/like`, null, { withCredentials: true });
  //       const newLikes = res.data?.data?.likes ?? res.data?.likes ?? null;
  //       if (newLikes !== null) {
  //         setSajaks((p) => p.map((s) => (s._id === id ? { ...s, likes: newLikes } : s)));
  //         return;
  //       }
  //     } catch (errLike) {
  //       // if 404, fallback; if other error, rethrow
  //       if (errLike?.response?.status && errLike.response.status !== 404) {
  //         throw errLike;
  //       }
  //     }

  //     // fallback to PATCH /sajak/:id with action
  //     const res2 = await api.patch(`/sajak/${id}`, { action: "toggleLike" }, { withCredentials: true });
  //     const newLikes2 = res2.data?.data?.likes ?? res2.data?.likes ?? null;
  //     if (newLikes2 !== null) {
  //       setSajaks((p) => p.map((s) => (s._id === id ? { ...s, likes: newLikes2 } : s)));
  //     }
  //     // else leave optimistic value
  //   } catch (err) {
  //     console.error("Failed to like:", err);
  //     alert("Gagal memberi like. Silakan coba lagi.");
  //     setSajaks(prev); // rollback
  //   }
  // };
  // ...
const handleLike = async (id) => {
  const prev = [...sajaks];
  // toggle like: jika sebelumnya liked, kurangi 1, jika belum, tambah 1
  setSajaks((p) =>
    p.map((s) =>
      s._id === id
        ? {
            ...s,
            likes: s.likedByUser ? (s.likes ?? 0) - 1 : (s.likes ?? 0) + 1,
            likedByUser: !s.likedByUser,
          }
        : s
    )
  );

  try {
    // panggil backend untuk toggle
    await api.patch(`/sajak/${id}`, { action: "toggleLike" }, { withCredentials: true });
  } catch (err) {
    console.error("Failed to like:", err);
    toast.error("Gagal memberi like. Silakan coba lagi.");
    setSajaks(prev); // rollback
  }
  };


  if (loading) {
    return <PageLoading message="Memuat data..."/>
  }

  if (user === null && !loading) {
    return <PageLoading message="Sesi Anda telah berakhir. Mengalihkan ke halaman login..."/>
  }

  return (
    <div className="min-h-screen bg-[#FFF9F4]">
      <div className="flex flex-col">
        <ProfileHeader user={user} formatJoinDate={formatJoinDate} />

        {/* Section Title */}
        <div className="w-full border-b-[0.5px] border-hitam flex flex-col items-center justify-center py-5 md:py-10 mb-4 md:mb-8 md:mt-6">
          <h2 className="font-jakarta text-3xl md:text-5xl font-bold text-[#363231] text-center underline underline-offset-8 decoration-cerise">
            SEMUA SAJAK
          </h2>
        </div>

        {/* Sajak Section */}
        <div className="px-4 md:px-8 lg:px-20 pb-8 relative">
          <SajakList sajaks={sajaks} onDelete={handleDelete} onLike={handleLike} />
          <FloatingCreateButton />
        </div>
      </div>
    </div>
  );
}
