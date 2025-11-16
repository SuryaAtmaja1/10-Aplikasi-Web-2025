import React from 'react';

const TextAreaInput = ({label, placeholder, rows=8, ...props}) => {
    return (
        <div className='w-full'>
            <label className='block text-2xl font-jakarta font-extrabold mb-2 text-black'>
                {label}
            </label>

            <textarea placeholder={placeholder} rows={rows} 
            className='w-full font-jakarta text-lg px-4 py-3 bg-white rounded-lg focus:outline-none focus:outline-none focus:ring-1 focus:ring-black border-1 border-[#B5B5B5] resize:none'
            {...props}>
                
            </textarea>
        </div>
    );
};

export default TextAreaInput;