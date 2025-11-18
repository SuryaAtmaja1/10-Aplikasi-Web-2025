"use client";

import React, { useState, useCallback, useEffect } from "react";
import ImageDropzone from "@/components/ReuseEditPost/ImageDropzone";
import TextInput from "@/components/ReuseEditPost/TextInput";
import TextAreaInput from "@/components/ReuseEditPost/TextAreaInput";
import Image from "next/image";
import Modal from "@/components/Modal";
import api from "@/utils/axiosInstance";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";

const ALL_TAGS = ["Alam", "Lokal", "Politik", "Sosial", "Ekonomi", "Teknologi"];

export default function EditSajakPage() {
  const router = useRouter();
  const params = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  // ================================
  //  Load Current SAJAK
  // ================================
  useEffect(() => {
    const fetchSajak = async () => {
      try {
        const res = await api.get(`/sajak/${params.id}`);

        const data = res.data;
        console.log(data);
        setTitle(data.title);
        setContent(data.content);
        setSelectedTags(data.hashtags || []);

      } catch (error) {
        console.log(error);

        if (error?.response?.status === 401) {
          toast.error("Sesi habis, silakan login kembali");
          router.push("/auth/login");
        } else {
          toast.error("Gagal memuat data sajak");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSajak();
  }, [params.id, router]);

  // ================================
  //  Add/Remove TAG
  // ================================
  const removeTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  const addTag = (tagToAdd) => {
    if (!selectedTags.includes(tagToAdd)) {
      setSelectedTags([...selectedTags, tagToAdd]);
    }
    setIsDropdownOpen(false);
  };

  // ================================
  //  Confirm SAVE (PATCH)
  // ================================
  const handlePostConfirm = useCallback(async () => {
    setIsPostModalOpen(false);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);

      selectedTags.forEach(tag => {
        formData.append("tags[]", tag);
      });

      if (imageFile) {
        formData.append("image", imageFile);
      }

      await api.patch(`/sajak/${params.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      toast.success("Sajak berhasil diubah!");

      router.push("/profile");

    } catch (error) {
      console.log("Edit error:", error);

      if (error?.response?.status === 401) {
        toast.error("Sesi habis, silakan login kembali");
        router.push("/auth/login");
        return;
      }

      toast.error(error?.response?.data?.message || "Terjadi kesalahan");
    }
  }, [title, content, selectedTags, imageFile, router, params.id]);

  // ================================
  //  CANCEL confirm
  // ================================
  const handleCancelConfirm = () => {
    setIsCancelModalOpen(false);
    router.push("/profile");
  };

  if (loading) {
    return (
      <div className="w-full text-center pt-20 text-lg font-jakarta">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pb-20">
      {/* MODALS */}
      <Modal
        isOpen={isPostModalOpen}
        title="Simpan perubahan?"
        onConfirm={handlePostConfirm}
        onCancel={() => setIsPostModalOpen(false)}
      />

      <Modal
        isOpen={isCancelModalOpen}
        title="Kembali ke halaman profile?"
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

          <div className="relative">
            <h1 className="text-3xl md:text-5xl font-jakarta font-extrabold text-black">
              EDIT SAJAK
            </h1>

            <div className="absolute top-1/2 right-0 -translate-y-1/2">
              <Image
                src="/babi.svg"
                alt="gambar babi"
                width={70}
                height={40}
                className="w-35 h-37 md:w-45 md:h-47"
              />
            </div>
          </div>
        </div>

        {/* TAG SELECT */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative inline-block w-auto">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between w-40 px-4 py-1.5 md:px-5 md:py-2 bg-oren text-black text-sm md:text-base font-jakarta font-bold rounded-lg"
              >
                TAG
                <span className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}>
                  ▼
                </span>
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 w-40 md:w-48 mt-2 bg-white rounded-lg border border-oren shadow-lg">
                  {ALL_TAGS.map((tag) => (
                    <a
                      key={tag}
                      onClick={() => addTag(tag)}
                      className="block px-4 py-1.5 md:py-2 text-sm md:text-base text-black font-jakarta hover:bg-[#F3F3F3] cursor-pointer"
                    >
                      {tag}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center bg-white rounded-md px-2 py-0.5 md:px-3 md:py-1 text-sm md:text-base font-jakarta font-medium text-black border border-oren"
                >
                  <span>{tag}</span>

                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-black hover:text-cerise font-jakarta font-bold"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* IMAGE + FORM */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-6 lg:gap-10">
          <div className="mb-6 md:mb-0 md:col-span-5">
            <ImageDropzone onFileSelect={(file) => setImageFile(file)} />
          </div>

          <div className="flex flex-col gap-6 md:col-span-7">
            <TextInput
              label="Judul"
              placeholder="Masukkan sajak anda..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <TextAreaInput
              label="Konten"
              placeholder="Masukkan isi konten sajak anda...."
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col-reverse md:flex-row md:justify-end items-end gap-3 mt-8">
          <button
            onClick={() => setIsCancelModalOpen(true)}
            className="w-auto md:w-auto px-6 py-1.5 md:px-8 md:py-3 bg-cerise text-white font-jakarta font-semibold text-sm md:text-base rounded-lg transform hover:scale-105 transition-transform duration-200"
          >
            CANCEL
          </button>

          <button
            onClick={() => setIsPostModalOpen(true)}
            className="w-auto md:w-auto px-6 py-1.5 md:px-8 md:py-3 bg-hijau text-white font-jakarta font-semibold text-sm md:text-base rounded-lg transform hover:scale-105 transition-transform duration-200"
          >
            SAVE
          </button>
        </div>
      </main>
    </div>
  );
}
