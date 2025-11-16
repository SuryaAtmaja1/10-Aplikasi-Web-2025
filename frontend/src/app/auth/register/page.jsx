'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import TextInput from '@/components/ReuseLoginRegister/TextInput'; 

export default function RegisterPage() { 
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = useCallback(() => {
        console.log('Register attempt:', { username, email, password });
    }, [username, email, password]);

    const handleLoginClick = useCallback(() => {
        router.push('/auth/login'); 
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
            <div className="absolute inset-0 bg-black opacity-35 -z-10"></div>

            <div className="w-full max-w-sm md:max-w-4xl bg-white bg-opacity-75 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12">
                <h1 className="text-3xl md:text-4xl font-jakarta font-extrabold text-black text-center mb-8">
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
                            className="w-full bg-black text-white font-jakarta font-semibold py-3 rounded-lg transform hover:scale-105 transition-transform duration-200"
                        >
                            SIGN UP
                        </button>
                    </div>

                    <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[75%]">
                        <div className="h-full w-px bg-gray-400">

                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-4 mt-6 md:mt-0">
                        <p className="text-black font-jakarta text-center">
                            Already have an account?{' '}
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
};