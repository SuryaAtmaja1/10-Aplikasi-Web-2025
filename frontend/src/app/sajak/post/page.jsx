"use client";

import React, { useState, useCallback, useEffect } from "react";
import ImageDropzone from "@/components/ReuseEditPost/ImageDropzone";
import TextInput from "@/components/ReuseEditPost/TextInput";
import TextAreaInput from "@/components/ReuseEditPost/TextAreaInput";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import api from "@/utils/axiosInstance";

const ALL_TAGS = ["Alam", "Lokal", "Politik", "Sosial", "Ekonomi", "Teknologi"];

export default function EditSajakPage() {
  const router = useRouter();

  // form states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  // UI states
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // auth states
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [user, setUser] = useState(null);

  // Tag helpers
  const removeTag = (tagToRemove) => {
    setSelectedTags(
      selectedTags.filter((tag) => tag !== tagToRemove && tag !== "")
    );
  };

  const addTag = (tagToAdd) => {
    if (!selectedTags.includes(tagToAdd) && tagToAdd !== "") {
      setSelectedTags([...selectedTags, tagToAdd]);
    }
    setIsDropdownOpen(false);
  };

  const handleImageSelect = (file) => setImageFile(file ?? null);

  useEffect(() => {
    let mounted = true;

    async function checkUser() {
      try {
        setCheckingAuth(true);
        const res = await api.get("/user");
        if (!mounted) return;
        setUser(res.data);
      } catch (err) {
        const status = err?.response?.status;
        if (status === 401) {
          router.push("/auth/login");
          return;
        }
        console.error("Error saat cek user:", err);
        router.push("/auth/login");
      } finally {
        if (mounted) setCheckingAuth(false);
      }
    }

    checkUser();

    return () => {
      mounted = false;
    };
  }, [router]);

  const handlePostConfirm = useCallback(async () => {
    setErrorMsg("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("tags", selectedTags.join(","));
      if (imageFile) formData.append("image", imageFile);

      const res = await api.post("/sajak/", formData);

      console.log("POST success:", res.data);
      setIsPostModalOpen(false);
      router.push("/profile");
    } catch (err) {
      console.error("Failed to post sajak:", err);
      if (err?.response?.status === 401) {
        router.push("/auth/login");
        return;
      }
      setErrorMsg(err?.response?.data?.message || "Gagal mengirim sajak.");
    } finally {
      setLoading(false);
    }
  }, [title, content, selectedTags, imageFile, router]);

  const handleCancelConfirm = useCallback(() => {
    setIsCancelModalOpen(false);
    router.push("/profile");
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Memeriksa status login...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="relative min-h-screen pb-20">
      <Modal
        isOpen={isPostModalOpen}
        title="Post Sajak?"
        onConfirm={handlePostConfirm}
        onCancel={() => setIsPostModalOpen(false)}
        confirmText={loading ? "Posting..." : "Ya, Post"}
        cancelText="Batal"
        disableConfirm={loading}
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

          <h1 className="text-3xl md:text-5xl font-jakarta font-extrabold text-black">
            POST SAJAK
          </h1>
        </div>

        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative inline-block w-auto">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between w-40 px-4 py-1.5 md:px-5 md:py-2 bg-oren text-black text-sm md:text-base font-jakarta font-bold rounded-lg"
              >
                TAG
                <span
                  className={`transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                >
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
              {selectedTags.map((tag) =>
                tag !== "" ? (
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
                ) : null
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-6 lg:gap-10">
          <div className="mb-6 md:mb-0 md:col-span-5">
            <ImageDropzone
              onFileSelect={handleImageSelect}
              initialFile={imageFile}
            />
            {imageFile && (
              <p className="mt-2 text-sm text-gray-600">
                Gambar terpilih: {imageFile.name}
              </p>
            )}
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
              placeholder="Masukan isi konten sajak anda...."
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>

        {errorMsg && (
          <div className="mt-4 text-sm text-red-600">{errorMsg}</div>
        )}

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
            {loading ? "Posting..." : "POST"}
          </button>
        </div>
      </main>
    </div>
  );
}
