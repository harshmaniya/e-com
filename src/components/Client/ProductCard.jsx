'use client'

import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';


const ProductCard = ({ product, goToTheProduct }) => {
  const [isLiked, setIsLiked] = useState(false);
  console.log("🚀 ~ file: ProductCard.jsx:8 ~ card ~ isLiked:", isLiked)

  const toggleLike = () => {
    setIsLiked(prev => !prev);
  };

  return (
    <>
      <div className=' rounded-md shadow-md max-w-xs  border-1 hover:cursor-pointer relative mb-5'>
        <div className="relative overflow-hidden mb-4">
          <img src={product?.images[0]} alt="Product Image" className="w-full h-[160px] rounded-t" />
          <div className="w-full h-[150px] absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-center items-center">
            <FontAwesomeIcon
              icon={isLiked ? faHeartSolid : faHeartRegular}
              onClick={toggleLike}
              className="cursor-pointer"
              style={{ fontSize: "26px", color: "white", marginBottom: "10px" }}
            />
            <p className='text-white text-xl' onClick={() => goToTheProduct(product._id)}>view Product</p>
          </div>
        </div>
        <div className='flex justify-between items-center mx-4'>
          <p className="text-lg font-semibold pb-2">{product?.name}</p>
          <p className="text-gray-700 pb-2">Price</p>
        </div>
      </div>
    </>
  )
}

export default ProductCard