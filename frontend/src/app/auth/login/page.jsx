"use client";
import api from "@/utils/axiosInstance";
import React, { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import TextInput from "@/components/ReuseLoginRegister/TextInput";
import { FaXmark } from "react-icons/fa6";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const googleStatus = params.get("googleLogin");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (googleStatus) {
      if (googleStatus === "failed")
        alert("Google login gagal. Silakan coba lagi.");

      // remove query param from URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    }
  }, [googleStatus]);

  const handleLogin = useCallback(async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      console.log("LOGIN SUCCESS:", res.data);

      // alert("Login successful!");
      router.push("/");
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Server error");
      }
    }
  }, [email, password, router]);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:4000/auth/google";
  };

  const handleRegisterClick = useCallback(() => {
    router.push("/auth/register");
  }, [router]);

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4">
      <Image
        src="/book.jpg"
        alt="Library Background"
        fill={true}
        objectFit="cover"
        className="-z-20"
      />

      {/* overlay gelap */}
      <div className="absolute inset-0 bg-hitam opacity-35 -z-10"></div>

      {/* login card */}
      <div className="relative w-full max-w-sm md:max-w-4xl bg-putih bg-opacity-75 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12">
        <button
          onClick={() => router.back()}
          className="absolute top-6 right-6 text-hitam hover:text-gray-600 text-3xl"
        >
          <FaXmark />
        </button>

        <h1 className="text-3xl md:text-4xl font-jakarta font-extrabold text-hitam text-center mb-8">
          LOGIN
        </h1>

        <div className="relative grid grid-cols-1 md:grid-cols-2 items-center md:gap-8">
          <div className="flex flex-col gap-6 md:pr-8">
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
              onClick={handleLogin}
              className="w-full bg-hitam text-white font-jakarta font-semibold py-3 rounded-lg transform hover:scale-105 transition-transform duration-200"
            >
              LOGIN
            </button>
          </div>

          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[65%]">
            <div className="h-full w-px bg-gray-400"></div>
          </div>

          <div className="flex items-center my-6 md:hidden">
            <div className="grow border-t border-gray-400"></div>

            <span className="mx-4 text-gray-600">Or</span>

            <div className="grow border-t border-gray-400"></div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            <span className="hidden md:block text-hitam font-jakarta">Or</span>

            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-2 w-full max-w-xs bg-hitam text-white font-jakarta font-semibold py-3 rounded-lg transform hover:scale-105 transition-transform duration-200"
            >
              <Image src="/google.svg" alt="Google" width={20} height={20} />
              <span>Login with Google</span>
            </button>

            <p className="text-hitam font-jakarta mt-4">
              Don&apos;t have account?{" "}
              <span
                onClick={handleRegisterClick}
                className="font-bold text-biru hover:underline cursor-pointer"
              >
                Register Here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
