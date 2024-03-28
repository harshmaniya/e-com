'use client';

import Image from 'next/image';
import { toast } from 'react-toastify'
import React, { useEffect, useState } from 'react';
import { GET_PRODUCT, ADD_TO_CART } from '@/apollo/client/query';
import { useMutation, useQuery } from '@apollo/client';
import Button from '@/src/components/Client/Button';
import { useRouter } from 'next/navigation';
import Loader from '@/src/components/Loader';

const Product = ({ params }) => {

    const router = useRouter()

    const [selectedColor, setSelectedColor] = useState('');
    const [qty, setQty] = useState(1);

    const [AddToCart] = useMutation(ADD_TO_CART)

    const { data, loading } = useQuery(GET_PRODUCT, {
        variables: {
            id: params.id
        }
    })

    const handleIncreaseQty = () => {
        setQty(prev => prev + 1);
    }

    const handleDecreaseQty = () => {
        setQty(prev => prev > 1 ? prev - 1 : 1);
    }

    const addToCart = () => {
        AddToCart({
            variables: {
                input: {
                    pid: data.getProduct?._id,
                    color: selectedColor,
                    qty
                }
            }
        }).then((res) => {
            toast.success(res.data.addToCart)
            router.push('/cart')
        }).catch((err) => {
            toast.error(err.message)
        })
    }

    const [heroImg, setHeroImg] = useState(null)

    useEffect(() => {
        if (data && data.getProduct && data.getProduct.images && data.getProduct.images.length > 0) {
            setSelectedColor(data.getProduct.colors[0]?._id)
            setHeroImg(data.getProduct.images[0])
        }
    }, [data]);

    return (
        <>
            {!loading ?
                <div className='flex justify-center'>
                    <div className='p-8'>
                        <Button className={"mb-4"} onClick={() => router.back()} title={"BACK TO PRODUCTS"} />
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
                    <div className='p-8 w-full md:w-1/2 mt-12'>
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
                            <div className='flex md:w-1/2'>
                                <div className='flex gap-2 items-center'>
                                    <h3 className='text-lg font-bold'>Colors :</h3>
                                    {data?.getProduct?.colors?.map((color, index) => (
                                        <div
                                            key={index}
                                            onClick={() => setSelectedColor((prev) => prev == color._id ? '' : color._id)}
                                            className="w-5 h-5 relative bg-white rounded-full p-2"
                                            style={{ backgroundColor: color.hexCode }}
                                        >
                                            {selectedColor === color._id.toString() && (
                                                <>
                                                    <div className="absolute inset-0 ring-2 ring-red-900 rounded-full"></div>
                                                    <svg
                                                        className="text-white"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        style={{ width: '60%', height: '60%' }}
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
                                                    </svg>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                    {/* {data?.getProduct?.colors?.map((itemColor) => (
                                        <div
                                            onClick={() => setColor(itemColor._id)}
                                            key={itemColor._id}
                                            style={{ width: '20px', height: '20px', backgroundColor: itemColor.hexCode, borderRadius: '50%', padding: '10px' }}>
                                        </div>
                                    ))} */}
                                </div>
                                <p>{data?.getProduct?.color?.name}</p>
                            </div>
                        </div>

                        <div className='flex flex-col md:flex-row md:justify-between mt-2'>
                            <p className='flex font-bold text-4xl space-x-8 py-4'>
                                <button onClick={handleDecreaseQty}>-</button>
                                <span>{qty}</span>
                                <button onClick={handleIncreaseQty}>+</button>
                            </p>
                        </div>

                        <Button onClick={addToCart} title={"ADD TO CART"} />
                    </div>
                </div>
                :
                <Loader />
            }
        </>
    );
};

export default Product;
