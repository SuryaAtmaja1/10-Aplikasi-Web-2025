"use client";
import api from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import TextInput from "@/components/ReuseLoginRegister/TextInput";
import { FaXmark } from "react-icons/fa6";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = useCallback(async () => {
    try {
      const res = await api.post("/auth/register", {
        username,
        email,
        password,
      });

      // console.log("REGISTER SUCCESS:", res.data);

      toast.success("Register Berhasil!");
      router.push("/auth/login");
    } catch (err) {
      console.error("REGISTER ERROR:", err);

      if (err.response) {
        toast.error(err.response.data.message || "Registration failed");
      } else {
        toast.error("Server error");
      }
    }
  }, [username, email, password, router]);
  
  const handleGoogleLogin = () => {
    const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    window.location.href = `${API_URL}/auth/google`;
  };

  const handleLoginClick = useCallback(() => {
    router.push("/auth/login");
  }, [router]);

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4">
      {/* BG*/}
      <Image
        src="/book.jpg"
        alt="Library Background"
        fill={true}
        objectFit="cover"
        className="-z-20"
      />

      {/* Overlay Gelap */}
      <div className="absolute inset-0 bg-hitam opacity-35 -z-10"></div>

      <div className="relative w-full max-w-sm md:max-w-4xl bg-putih bg-opacity-75 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12">
        <button
          onClick={() => router.back()}
          className="absolute top-6 right-6 text-hitam hover:text-gray-600 text-3xl"
        >
          <FaXmark />
        </button>
        <h1 className="text-3xl md:text-4xl font-jakarta font-extrabold text-hitam text-center mb-8">
          REGISTER
        </h1>

        <div className="relative grid grid-cols-1 md:grid-cols-2 items-center md:gap-8">
          <div className="flex flex-col gap-6 md:pr-8">
            <TextInput
              label="Username"
              placeholder="JohnDoe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
            />
            <TextInput
              label="Email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <TextInput
              label="Password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <button
              onClick={handleRegister}
              className="w-full bg-hitam text-putih font-jakarta font-semibold py-3 rounded-lg transform hover:scale-105 transition-transform duration-200"
            >
              SIGN UP
            </button>
          </div>

          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[75%]">
            <div className="h-full w-px bg-gray-400"></div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 mt-6 md:mt-0">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-2 w-full max-w-xs bg-hitam text-white font-jakarta font-semibold py-3 rounded-lg transform hover:scale-105 transition-transform duration-200"
            >
              <Image src="/google.svg" alt="Google" width={20} height={20} />
              <span>Login with Google</span>
            </button>
            <p className="text-hitam font-jakarta text-center">
              Already have an account?{" "}
              <span
                onClick={handleLoginClick}
                className="font-bold text-biru hover:underline cursor-pointer"
              >
                Login Here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
