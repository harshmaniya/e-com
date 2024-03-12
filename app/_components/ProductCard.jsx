'use client';

import Image from 'next/image';
import React from 'react';

const ProductCard = ({ img, price, name }) => {
    return (
        <div className='rounded-md shadow-md max-w-xs'>
            <div className="relative mb-4">
                <Image src={img} alt="Product Image" width={500} height={500} className="rounded-md" />
            </div>
            <div className='flex justify-between px-2'>
                <p className="text-lg mb-2">{name}</p>
                <p className="text-gray-700">{price}</p>
            </div>
        </div>
    );
}

export default ProductCard;
