// buat edit profile

'use client';

import React, {useState, useCallback} from 'react';
import ImageDropzone from '@/components/ReuseEditPost/ImageDropzone';
import TextInput from '@/components/ReuseEditPost/TextInput';
import Image from 'next/image';
// import { useRouter } from 'next/navigation'; 

const Modal = ({ isOpen, title, onConfirm, onCancel }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 shadow-2xl w-full max-w-sm">
                <h2 className="text-xl font-jakarta font-bold text-black mb-4">{title}</h2>
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-4">
                    <button 
                        onClick={onCancel}
                        className='w-full sm:w-auto px-6 py-2 text-[#D1345B] border border-[#D1345B] font-jakarta font-semibold rounded-lg hover:bg-gray-100 transition duration-150'>
                        Tidak
                    </button>
                    <button 
                        onClick={onConfirm}
                        className='w-full sm:w-auto px-6 py-2 bg-[#09814A] text-white font-jakarta font-semibold rounded-lg hover:bg-[#076B3D] transition duration-150'>
                        Iya
                    </button>
                </div>
            </div>
        </div>
    );
};


export default function EditProfilePage(){
    // const router = useRouter(); 

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [bio, setBio] = useState(''); 

    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

    const handleSaveConfirm = useCallback(() => {
        console.log('Saving profile:', { name, location, bio });
        setIsSaveModalOpen(false);
        // logic POST/PUT data ke backend
    }, [name, location, bio]);

    const handleCancelConfirm = useCallback(() => {
        console.log('Batalkan edit profile.');
        setIsCancelModalOpen(false);
        // router.push('/user/profile') // arahkan balik
    }, []);

    return(
        <div className='relative min-h-screen pb-20'>
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

            <main className='relative container mx-auto pt-8 px-5 md:px-20'>
                <div className='mb-6 md:mb-8 space-y-5'> 
                    <button 
                        onClick={() => setIsCancelModalOpen(true)} 
                        className='text-[#FA7921] text-5xl mr-3 transform hover:scale-120 transition-transform duration-200'>
                        &lt;
                    </button>
                    
                    <div className='flex items-center gap-4'>
                        <h1 className='text-3xl md:text-5xl font-jakarta font-extrabold text-black'>
                            EDIT PROFILE
                        </h1>
                        
                        <Image
                            src="/kura2.svg"
                            alt="gambar kura kura"
                            width={40}
                            height={40}
                            className='w-20 h-20 md:w-25 md:h-25'
                        />
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-12 md:gap-6 lg:gap-10'>
                    <div className='mb-6 md:mb-0 md:col-span-5'>
                        <h2 className='text-2xl font-jakarta font-extrabold mb-2 text-black'>
                            Profile Picture
                        </h2>
                        <ImageDropzone/>
                    </div>

                    <div className='flex flex-col gap-6 md:col-span-7'>
                        <TextInput
                        label="Name"
                        placeholder="Masukkan nama anda..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}/>
                        
                        <TextInput
                        label="Location"
                        placeholder="Masukkan lokasi anda..."
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}/>
                        
                        <TextInput
                        label="Bio"
                        placeholder="Masukkan bio anda..."
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}/>
                    </div>

                </div>

                <div className='flex flex-col-reverse md:flex-row md:justify-end items-end gap-3 mt-8'>
                    <button 
                        onClick={() => setIsCancelModalOpen(true)}
                        className='w-auto md:w-auto px-6 py-1.5 md:px-8 md:py-3 bg-[#D1345B] text-white font-jakarta font-semibold text-sm md:text-base rounded-lg transform hover:scale-105 transition-transform duration-200'>
                        CANCEL
                    </button>

                    <button 
                        onClick={() => setIsSaveModalOpen(true)} 
                        className='w-auto md:w-auto px-6 py-1.5 md:px-8 md:py-3 bg-[#09814A] text-white font-jakarta font-semibold text-sm md:text-base rounded-lg transform hover:scale-105 transition-transform duration-200'>
                        SAVE
                    </button>
                </div>
            </main>
        </div>
    );
};