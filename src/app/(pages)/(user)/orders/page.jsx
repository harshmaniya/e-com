'use client'

import Image from 'next/image'
import React from 'react'


const page = () => {
    const products = [
        {
            id: 1,
            name: "Product 1",
            image: "https://example.com/image1.jpg",
            price: 29.99,
            color: {
                name: "Red",
                hexCode: "#FF0000"
            }
        },
        {
            id: 2,
            name: "Product 2",
            image: "https://example.com/image2.jpg",
            price: 39.99,
            color: {
                name: "Blue",
                hexCode: "#0000FF"
            }
        },
        {
            id: 3,
            name: "Product 3",
            image: "https://example.com/image3.jpg",
            price: 49.99,
            color: {
                name: "Green",
                hexCode: "#00FF00"
            }
        },
        {
            id: 4,
            name: "Product 4",
            image: "https://example.com/image4.jpg",
            price: 59.99,
            color: {
                name: "Yellow",
                hexCode: "#FFFF00"
            }
        },
        {
            id: 5,
            name: "Product 5",
            image: "https://example.com/image5.jpg",
            price: 69.99,
            color: {
                name: "Purple",
                hexCode: "#800080"
            }
        }
    ];


    return (
        <div>
            <p className='text-center px-3 text-5xl py-12 drop-shadow-lg font-bold'>My Orders</p>

            <div className="container mx-auto">
                <div className="w-full mb-8">
                    <div className="flex py-3 text-white  items-center justify-evenly  bg-[#ab7a5f] border border-[#ab7a5f]">
                        <div>Order Placed : <span>Date</span></div>
                        <div>Total : <span>Date</span></div>
                        <div>orderId : <span>Date</span></div>
                    </div>
                    <div className="flex justify-around items-center border border-[#ab7a5f] border-t-0 p-5">
                        <div className='flex items-end'>
                            <Image width={100} height={100} src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Ambersweet_oranges.jpg/1200px-Ambersweet_oranges.jpg" />
                            <div className='px-5'>
                                <p>
                                    total Items: <span> 23</span>
                                </p>
                                <p>
                                    total Price: <span> 13224</span>
                                </p>

                                <div className="flex pt-5">
                                    <button className='border-b mr-5 text-[#ab7a5f] opacity-80'>View Order</button>
                                    <button className='border-b mr-5 text-[#ab7a5f] opacity-80'>Buy it again</button>
                                </div>
                            </div>
                        </div>
                        <div className='flex items-stretch flex-col'>
                            <p className='underline mb-3 text-lg text-[#ab7a5f] opacity-80'>view Order Status</p>

                            <button className='bg-[#ab7a5f] text-white px-3 py-2 mt-3'>VIEW INVOICE</button>
                        </div>
                    </div>

                </div>

            </div>
        </div>

    )
}

export default page