import React from 'react';

const TextInput = ({label, placeholder, ...props}) => {
    return(
        <div className='w-full'>
            <label className='block text-base font-jakarta font-extrabold mb-2 text-black'>
                {label}
            </label>

            <input type='text' placeholder={placeholder} 
            className='w-full font-jakarta text-lg px-3 py-2 bg-white rounded-lg focus:outline-none focus:outline-none focus:ring-1 focus:ring-black border border-[#B5B5B5]'
            {...props}>
            </input>
        </div>
    );
};

export default TextInput;
