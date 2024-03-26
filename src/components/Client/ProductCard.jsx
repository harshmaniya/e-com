import Image from 'next/image';
import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className='rounded-md shadow-md max-w-xs hover:opacity-80'>
            <div className="relative mb-4">
                <Image src={product.images[0]} alt="Product Image" width={500} height={500} className="rounded-md" />
            </div>
            <div className='flex justify-between px-2'>
                <p className="text-lg mb-2">{product.name}</p>
                <p className="text-gray-700">{product.price}</p>
            </div>
        </div>
    );
}

export default ProductCard;
