// buat post sajak
'use client';

import React, {useState, useCallback} from 'react';
import ImageDropzone from '@/components/ReuseEditPost/ImageDropzone';
import TextInput from '@/components/ReuseEditPost/TextInput';
import TextAreaInput from '@/components/ReuseEditPost/TextAreaInput'; 
// import { useRouter } from 'next/navigation'; 

const ALL_TAGS = ['Alam', 'Lokal', 'Politik', 'Sosial', 'Ekonomi', 'Teknologi'];

const Modal = ({ isOpen, title, onConfirm, onCancel }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 shadow-2xl w-full max-w-sm">
                <h2 className="text-xl font-jakarta font-bold text-black mb-4">{title}</h2>
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-4">
                    <button 
                        onClick={onCancel}
                        className='w-full sm:w-auto px-6 py-2 text-cerise border border-cerise font-jakarta font-semibold rounded-lg hover:bg-gray-100 transition duration-150'>
                        Tidak
                    </button>
                    <button 
                        onClick={onConfirm}
                        className='w-full sm:w-auto px-6 py-2 bg-hijau text-white font-jakarta font-semibold rounded-lg hover:bg-[#076B3D] transition duration-150'>
                        Iya
                    </button>
                </div>
            </div>
        </div>
    );
};


export default function EditSajakPage(){
    // const router = useRouter(); 

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedTags, setSelectedTags] = useState([]); 
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

    const removeTag = (tagToRemove) => {
        setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove && tag !== ''));
    };

    const addTag = (tagToAdd) =>{
        if(!selectedTags.includes(tagToAdd) && tagToAdd !== ''){
            setSelectedTags([...selectedTags, tagToAdd]);
        }
        setIsDropdownOpen(false);
    };

    const handlePostConfirm = useCallback(() => {
        console.log('Posting sajak:', { title, content, selectedTags });
        setIsPostModalOpen(false);
        // logic POST data ke backend
    }, [title, content, selectedTags]);

    const handleCancelConfirm = useCallback(() => {
        console.log('Batalkan post.');
        setIsCancelModalOpen(false);
        // router.push('/user/profile') kmna ini
    }, []);

    return(
        <div className='relative min-h-screen pb-20'>
            <Modal
                isOpen={isPostModalOpen}
                title="Post Sajak?"
                onConfirm={handlePostConfirm}
                onCancel={() => setIsPostModalOpen(false)}
            />
            <Modal
                isOpen={isCancelModalOpen}
                title="Batalkan?"
                onConfirm={handleCancelConfirm}
                onCancel={() => setIsCancelModalOpen(false)}
            />

            <div className='absolute top-0 right-0 p-4 opacity-30 -z-0'>
                <p className='text-sm'>
                    [placeholder: GambarBabi]
                </p>
            </div>

            <main className='relative container mx-auto pt-8 px-5 md:px-20'>
                <div className='mb-6 md:mb-8 space-y-5'> 
                    <button 
                        onClick={() => setIsCancelModalOpen(true)} 
                        className='text-oren text-5xl mr-3 transform hover:scale-120 transition-transform duration-200'>
                        &lt;
                    </button>
                    
                    <h1 className='text-3xl md:text-5xl font-jakarta font-extrabold text-black'>
                        POST SAJAK
                    </h1>
                </div>


                <div className='mb-6 md:mb-8'>
                    <div className='flex flex-col md:flex-row md:items-center gap-4'>
                        <div className='relative inline-block w-auto'> 
                            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className='flex items-center justify-between w-40 px-4 py-1.5 md:px-5 md:py-2 bg-oren text-black text-sm md:text-base font-jakarta font-bold rounded-lg'>
                                TAG
                                <span className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>
                                    ▼
                                </span>
                            </button>

                            {isDropdownOpen && (
                                <div className='absolute z-10 w-40 md:w-48 mt-2 bg-white rounded-lg border border-oren shadow-lg'>
                                    {ALL_TAGS.map((tag) => (
                                        <a key={tag} onClick={() => addTag(tag)}
                                            className='block px-4 py-1.5 md:py-2 text-sm md:text-base text-black font-jakarta hover:bg-[#F3F3F3] cursor-pointer'>
                                            {tag}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className='flex flex-wrap gap-2'>
                            {selectedTags.map((tag) => (
                                tag !== '' && ( 
                                <div key={tag}
                                    className='flex items-center bg-white rounded-md px-2 py-0.5 md:px-3 md:py-1 text-sm md:text-base font-jakarta font-medium text-black border border-oren'>
                                    
                                    <span>{tag}</span>

                                    <button onClick={() => removeTag(tag)}
                                        className='ml-2 text-black hover:text-cerise font-jakarta font-bold'>
                                        &times;
                                    </button>
                                </div>
                                )
                            ))}
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-12 md:gap-6 lg:gap-10'>
                    <div className='mb-6 md:mb-0 md:col-span-5'>
                        <ImageDropzone/>
                    </div>

                    <div className='flex flex-col gap-6 md:col-span-7'>
                        <TextInput
                        label="Judul"
                        placeholder="Masukkan sajak anda..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}/>
                        
                        <TextAreaInput
                        label="Konten"
                        placeholder="Masukan isi konten sajak anda...."
                        rows={10} 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}/>
                    </div>
                </div>

                <div className='flex flex-col-reverse md:flex-row md:justify-end items-end gap-3 mt-8'>
                    <button 
                        onClick={() => setIsCancelModalOpen(true)}
                        className='w-auto md:w-auto px-6 py-1.5 md:px-8 md:py-3 bg-cerise text-white font-jakarta font-semibold text-sm md:text-base rounded-lg transform hover:scale-105 transition-transform duration-200'>
                        CANCEL
                    </button>

                    <button 
                        onClick={() => setIsPostModalOpen(true)} 
                        className='w-auto md:w-auto px-6 py-1.5 md:px-8 md:py-3 bg-hijau text-white font-jakarta font-semibold text-sm md:text-base rounded-lg transform hover:scale-105 transition-transform duration-200'>
                        POST
                    </button>
                </div>
            </main>
        </div>
    );
};