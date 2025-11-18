"use client";
import React, { useRef, useCallback, useState, useEffect } from 'react';
import Image from 'next/image';

const ImageDropzone = ({ onFileSelect }) => {  // ← TAMBAH INI
    const fileInputRef = useRef(null);
    const [previewSrc, setPreviewSrc] = useState(null); 
    const [isDragging, setIsDragging] = useState(false); 

    const processFile = useCallback((file) => {
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            alert("File harus berupa gambar.");
            return;
        }

        console.log('File dipilih:', file);

        // KIRIM FILE KE PARENT 
        if (onFileSelect) {
            onFileSelect(file);
        }

        // Preview
        if (previewSrc) {
            URL.revokeObjectURL(previewSrc);
        }

        const newPreviewSrc = URL.createObjectURL(file);
        setPreviewSrc(newPreviewSrc);

        // simpan file ke <input>
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);

        if (fileInputRef.current) {
            fileInputRef.current.files = dataTransfer.files;
        }

    }, [previewSrc, onFileSelect]);

    const handleFileChange = useCallback((e) => {
        const file = e.target.files?.[0];
        processFile(file);
    }, [processFile]);

    const handleBrowseClick = useCallback((e) => {
        e.preventDefault();
        fileInputRef.current?.click();
    }, []);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        processFile(file);
    }, [processFile]);

    useEffect(() => {
        return () => {
            if (previewSrc) {
                URL.revokeObjectURL(previewSrc);
            }
        };
    }, [previewSrc]);

    return(
        <div className='flex items-center justify-center w-full h-64 md:h-full min-h-[300px] lg:min-h-[400px]'>
            <label 
                htmlFor='dropzone-file'
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex flex-col items-center justify-center w-full h-full border border-dashed rounded-lg cursor-pointer transition-colors duration-200
                ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-[#B5B5B5] bg-[#FFFFFF] hover:bg-[#F3F3F3]'}`}
            >
                {previewSrc ? (
                    <div className="relative w-full h-full">
                        <Image 
                            src={previewSrc} 
                            alt="Preview" 
                            fill 
                            style={{ objectFit: 'contain' }} 
                            className="rounded-lg" 
                        />
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center pt-5 pb-6 text-center pointer-events-none'>
                        <div className='w-10 h-10 mb-3 text-[#B5B5B5]'>
                            <Image 
                                src="/ImageDropzone.svg" 
                                alt="Upload Icon" 
                                width={40} 
                                height={40} 
                            />
                        </div>
                        <p className='mb-2 text-base text-black font-jakarta'>
                            Drop your image and gif here
                        </p>
                        <p className='text-base text-black'>
                            or 
                            <span 
                                onClick={handleBrowseClick}
                                className='font-bold text-[#1B92FF] hover:underline cursor-pointer ml-1 pointer-events-auto'>
                                browse
                            </span>
                        </p>
                    </div>
                )}
                
                <input 
                    id='dropzone-file' 
                    type='file' 
                    className='hidden' 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*, image/gif"
                />
            </label>
        </div>
    );
};

export default ImageDropzone;
