'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { GET_PRODUCT } from '@/apollo/client/query';
import { useQuery } from '@apollo/client';
import Button from '@/app/_components/Button';
import { useRouter } from 'next/navigation';

const Product = ({ params }) => {

    console.log("params----- :", params.id);
    const router = useRouter()

    const qtyData = JSON.parse(localStorage.getItem('cartData')) || []
    let qtyItemIndex

    if (qtyData.length > 0) {
        qtyItemIndex = qtyData.findIndex(
            (item) => item.id === params.id
        )
    }

    const [qty, setQty] = useState(
        qtyItemIndex !== undefined && qtyItemIndex !== -1 ? qtyData[qtyItemIndex].qty : 1
    )

    const handleIncreaseQty = () => {
        setQty(prev => prev + 1);
    }

    const handleDecreaseQty = () => {
        setQty(prev => prev > 1 ? prev - 1 : 1);
    }

    const [color, setColor] = useState(null);

    const { data, loading } = useQuery(GET_PRODUCT, {
        variables: {
            id: params.id
        }
    });

    const addToCart = () => {
        const existingData = localStorage.getItem('cartData');

        const newItem = {
            id: params.id,
            name: data.getProduct.name,
            color: "",
            image: data.getProduct.images[0],
            price: data.getProduct.price,
            qty,
        };

        if (existingData) {
            const parsedData = JSON.parse(existingData);

            const existingItemIndex = parsedData.findIndex(
                (item) => item.id === newItem.id && item.color === newItem.color
            );

            if (existingItemIndex !== -1) {
                parsedData[existingItemIndex].qty = newItem.qty;
            } else {
                parsedData.push(newItem);
            }

            localStorage.setItem('cartData', JSON.stringify(parsedData));
        } else {
            const initialData = [newItem];
            localStorage.setItem('cartData', JSON.stringify(initialData));
        }
    };

    const [heroImg, setHeroImg] = useState(null);

    useEffect(() => {
        if (data && data.getProduct && data.getProduct.images && data.getProduct.images.length > 0) {
            setHeroImg(data.getProduct.images[0]);
        }
    }, [data]);


    return (
        <>
            <div className='flex justify-center'>
                <div className='p-8'>
                    <Button className={"mb-4"} onClick={()=>router.back()} title={"BACK TO PRODUCTS"} />
                    {loading && <h1>Loading...</h1>}
                    {heroImg && (
                        <div className='max-h-[400px] w-auto relative overflow-hidden'>
                            <Image src={heroImg} alt='' width={600} height={320} className='h-full w-auto' />
                        </div>
                    )}

                    <div className='flex justify-between h-[70px] overflow-hidden my-2'>
                        {data &&
                            data.getProduct.images.map((img, index) => (
                                <Image
                                    key={index}
                                    src={img}
                                    alt=''
                                    width={120}
                                    height={100}
                                    onClick={() => setHeroImg(img)}
                                    className='cursor-pointer'
                                />
                            ))}
                    </div>
                </div>
                <div className='p-8 w-full md:w-1/2'>
                    <h1 className='text-4xl font-bold mb-4'>{data?.getProduct?.name}</h1>
                    <h2 className='text-xl font-bold text-amber-700 mb-6'>$ {data?.getProduct?.price}</h2>
                    <p className='text-gray-700 mb-6 leading-loose'>{data?.getProduct?.description}</p>

                    <div className='flex flex-col md:flex-row md:justify-between mb-6'>
                        <div className='flex-1 md:w-1/2'>
                            <h3 className='text-lg font-bold mb-2'>Availability:</h3>
                            <p>{data?.getProduct?.stock > 0 ? 'In Stock' : 'Out Of Stock'}</p>
                        </div>
                        <div className='flex-1 md:w-1/2'>
                            <h3 className='text-lg font-bold mb-2'>SKU:</h3>
                            <p>{data?.getProduct?.sku}</p>
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row md:justify-between'>
                        <div className='flex-1 md:w-1/2'>
                            <h3 className='text-lg font-bold mb-2'>Brand:</h3>
                            <p>{data?.getProduct?.brand?.name}</p>
                        </div>                       
                    </div>

                    <hr className='my-8' />

                    <div className='flex flex-col md:flex-row md:justify-between'>
                        <div className='flex-1 md:w-1/2'>
                            <h3 className='text-lg font-bold mb-2'>Colors :</h3>
                            <p>{data?.getProduct?.color?.name}</p>
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row md:justify-between'>
                        <p className='flex font-bold text-4xl space-x-8 py-4'>
                            <button onClick={handleDecreaseQty}>-</button>
                            <span>{qty}</span>
                            <button onClick={handleIncreaseQty}>+</button>
                        </p>
                    </div>

                    <Button onClick={addToCart} title={"ADD TO CART"} />
                </div>
            </div>
        </>
    );
};

export default Product;
