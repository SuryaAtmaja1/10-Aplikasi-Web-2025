'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import TextInput from '@/components/ReuseLoginRegister/TextInput'; 

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = useCallback(() => {
        console.log('Login attempt:', { email, password });
    }, [email, password]);

    const handleGoogleLogin = useCallback(() => {
        console.log('Google login attempt');
    }, []);

    const handleRegisterClick = useCallback(() => {
        router.push('/auth/register'); 
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
            <div className="absolute inset-0 bg-black opacity-35 -z-10">

            </div>

            {/* login card */}
            <div className="w-full max-w-sm md:max-w-4xl bg-white bg-opacity-75 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12">
                <h1 className="text-3xl md:text-4xl font-jakarta font-extrabold text-black text-center mb-8">
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
                            className="w-full bg-black text-white font-jakarta font-semibold py-3 rounded-lg transform hover:scale-105 transition-transform duration-200"
                        >
                            LOGIN
                        </button>
                    </div>

                    <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[65%]">
                        <div className="h-full w-px bg-gray-400">

                        </div>
                    </div>

                    <div className="flex items-center my-6 md:hidden">
                        <div className="flex-grow border-t border-gray-400">

                        </div>

                        <span className="mx-4 text-gray-600">
                            Or
                        </span>

                        <div className="flex-grow border-t border-gray-400">

                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-4">
                        <span className="hidden md:block text-black font-jakarta">
                            Or
                        </span>

                        <button
                            onClick={handleGoogleLogin}
                            className="flex items-center justify-center gap-2 w-full max-w-xs bg-black text-white font-jakarta font-semibold py-3 rounded-lg transform hover:scale-105 transition-transform duration-200"
                        >
                            <Image
                                src="/google.svg" 
                                alt="Google"
                                width={20}
                                height={20}
                            />
                            <span>
                                Login with Google
                            </span>
                        </button>

                        <p className="text-black font-jakarta mt-4">
                            Don&apos;t have account?{' '}
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
};