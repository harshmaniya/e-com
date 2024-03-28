'use client'

import { GET_ALL_ORDERS_BY_USER } from '@/apollo/client/query';
import { DateFormatter } from '@/src/utils/DateFormatter';
import { useQuery } from '@apollo/client';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'


const Order = () => {

    const { data, error, loading } = useQuery(GET_ALL_ORDERS_BY_USER)   

    // [
    //     {
    //         "__typename": "Order",
    //         "_id": "6605353d521631293feb8dc2",
    //         "products": [
    //             {
    //                 "__typename": "ProductOrder",
    //                 "pid": {
    //                     "__typename": "Product",
    //                     "_id": "65eea58c3d992c8735a2dab6",
    //                     "name": "Suede Armchair",
    //                     "price": 159,
    //                     "images": [
    //                         "https://www.course-api.com/images/store/product-16.jpeg",
    //                         "https://www.course-api.com/images/store/extra-product-1.jpeg",
    //                         "https://www.course-api.com/images/store/extra-product-2.jpeg",
    //                         "https://www.course-api.com/images/store/extra-product-3.jpeg",
    //                         "https://www.course-api.com/images/store/extra-product-4.jpeg"
    //                     ]
    //                 },
    //                 "color": {
    //                     "__typename": "Color",
    //                     "_id": "65f3ef57abe6720e449afb57",
    //                     "name": "Red",
    //                     "hexCode": "#FF0000"
    //                 },
    //                 "qty": 4
    //             }
    //         ],
    //         "order_date": "1711617341762",
    //         "status": "pending",
    //         "shipping_address": "dsa, safdss, sdfsd, NY, 12321, US",
    //         "payment_method": "card",
    //         "payment_status": "paid",
    //         "total": 636,
    //         "createdAt": "1711617341768",
    //         "updatedAt": "1711617341768"
    //     }
    // ]





    return (
        <div className='px-34'>
            <p className='text-center px-3 text-5xl py-12 drop-shadow-lg font-bold'>My Orders</p>

            {data?.getAllOrdersByUser?.length === 0 && <p className='text-center px-3 text-xl py-24 drop-shadow-lg font-bold'>No Orders Found</p>}

            {
                data?.getAllOrdersByUser?.map((order) => (
                    <div className="container mx-auto">
                        <div className="w-full mb-8">
                            <div className="flex py-3 text-white  items-center justify-evenly  bg-[#ab7a5f] border border-[#ab7a5f]">
                                <div>Order Placed : <span>{DateFormatter(order.order_date)}</span></div>
                                {/* <div>Total : <span>{order.total}</span></div> */}
                                <div>orderId : <span>{order._id}</span></div>
                            </div>
                            <div className="flex justify-around items-center border border-[#ab7a5f] border-t-0 p-5">
                                <div className='flex items-end'>
                                    <Image width={100} height={100} src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Ambersweet_oranges.jpg/1200px-Ambersweet_oranges.jpg" />
                                    <div className='px-5'>
                                        <p>
                                            total Items: <span>{order.products.reduce((total, product) => total + product.qty, 0)}</span>
                                        </p>
                                        <p>
                                            total Price: <span>{order.total}</span>
                                        </p>

                                        <div className="flex pt-5">
                                            <Link href={`/orders/${order._id}`} className='border-b mr-5 text-[#ab7a5f] opacity-80'>View Order</Link>
                                            <Link href={`/orders/${order._id}`} className='border-b mr-5 text-[#ab7a5f] opacity-80'>Buy it again</Link>
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
                ))
            }

        </div>

    )
}

export default Order