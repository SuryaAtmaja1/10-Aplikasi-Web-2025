"use client";

import React, { useState, useCallback } from "react";
import ImageDropzone from "@/components/ReuseEditPost/ImageDropzone";
import TextInput from "@/components/ReuseEditPost/TextInput";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import api from "@/utils/axiosInstance";
import toast from "react-hot-toast"

export default function EditProfilePage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  // -------------------------
  // HANDLE SAVE TO BACKEND
  // -------------------------
  const handleSaveConfirm = useCallback(async () => {
    setIsSaveModalOpen(false);

    try {
      const formData = new FormData();
      // console.log("File Terpilih: ", profileImage)

      if (name) formData.append("username", name);
      if (location) formData.append("address", location);
      if (bio) formData.append("bio", bio);
      if (profileImage) formData.append("profileImage", profileImage);

      const res = await api.patch("/user", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true, 
      });

      // console.log("Updated user:", res.data.user);
      toast.success("Sukses mengedit profil pengguna");
      router.push("/profile"); // redirect setelah berhasil
    } catch (err) {
      console.error("Error saving profile:", err);

      // Jika token invalid / expired → redirect ke login
      if (err?.response?.status === 401) {
        toast.error("Sesi kamu habis, silakan login kembali.");
        router.push("/auth/login");
        return;
      }

      // Error lain
      toast.error(err?.response?.data?.message || "Failed to update profile.");
    }
  }, [name, location, bio, profileImage, router]);

  const handleCancelConfirm = useCallback(() => {
    setIsCancelModalOpen(false);
    router.push("/profile");
  }, [router]);

  return (
    <div className="relative min-h-screen pb-20">
      {/* Modal */}
      <Modal
        isOpen={isSaveModalOpen}
        title="Simpan Perubahan?"
        onConfirm={handleSaveConfirm}
        onCancel={() => setIsSaveModalOpen(false)}
      />

      <Modal
        isOpen={isCancelModalOpen}
        title="Batalkan Perubahan?"
        onConfirm={handleCancelConfirm}
        onCancel={() => setIsCancelModalOpen(false)}
      />

      <main className="relative container mx-auto pt-8 px-5 md:px-20">
        <div className="mb-6 md:mb-8 space-y-5">
          <button
            onClick={() => setIsCancelModalOpen(true)}
            className="text-oren text-5xl mr-3 transform hover:scale-120 transition-transform duration-200"
          >
            &lt;
          </button>

          <div className="flex items-center gap-4">
            <h1 className="text-3xl md:text-5xl font-jakarta font-extrabold text-black">
              EDIT PROFILE
            </h1>

            <Image
              src="/kura2.svg"
              alt="gambar kura kura"
              width={40}
              height={40}
              className="w-20 h-20 md:w-25 md:h-25"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-6 lg:gap-10">
          {/* Profile Picture */}
          <div className="mb-6 md:mb-0 md:col-span-5">
            <h2 className="text-2xl font-jakarta font-extrabold mb-2 text-black">
              Profile Picture
            </h2>

            <ImageDropzone onFileSelect={(file) => setProfileImage(file)} />
          </div>

          {/* Text Inputs */}
          <div className="flex flex-col gap-6 md:col-span-7">
            <TextInput
              label="Name"
              placeholder="Masukkan nama anda..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextInput
              label="Location"
              placeholder="Masukkan lokasi anda..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <TextInput
              label="Bio"
              placeholder="Masukkan bio anda..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row md:justify-end items-end gap-3 mt-8">
          <button
            onClick={() => setIsCancelModalOpen(true)}
            className="w-auto px-6 py-1.5 md:px-8 md:py-3 bg-cerise text-white rounded-lg transform hover:scale-105 transition"
          >
            CANCEL
          </button>

          <button
            onClick={() => setIsSaveModalOpen(true)}
            className="w-auto px-6 py-1.5 md:px-8 md:py-3 bg-hijau text-white rounded-lg transform hover:scale-105 transition"
          >
            SAVE
          </button>
        </div>
      </main>
    </div>
  );
}
