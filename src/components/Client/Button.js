'use client'

import React from 'react';

const Button = ({ title, className, ...rest }) => {   
    return (
        <button
            {...rest}
            className={`bg-[#ab7a5f] text-white px-4 py-2 rounded-md shadow-md ${className}`}
        >
            {title}
        </button>
    );
};

export default Button;
