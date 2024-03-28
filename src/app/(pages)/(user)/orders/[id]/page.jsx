'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { useParams, useRouter } from 'next/navigation';
import { GET_ORDER } from '@/apollo/client/query';
import { useQuery } from '@apollo/client';
import Loader from '@/src/components/Loader';
import { DateFormatter } from '@/src/utils/DateFormatter';

const Order = () => {
    const router = useRouter()
    const { id } = useParams()
    

    const [order, setOrder] = useState({})
    console.log("🚀 ~ Order ~ order:", order)

    const { data, error, loading } = useQuery(GET_ORDER, {
        variables: {
            orderId: id
        }
    })

    useEffect(() => {
        data?.getOrder && setOrder(data?.getOrder)
    }, [data])

    if (loading) {
        return <Loader />
    }

    return (
        <div className='container mx-auto'>
            <div className="w-3/4 mx-auto bg-[#fffaf8] py-10  px-10 mt-15 rounded-lg shadow-lg drop-shadow-sm">

                <div className="flex justify-between items-center">
                    <p className='text-xl mb-3'>Order-ID : <span>{order._id}</span></p>
                    {/* <button className='bg-[#ab7a5f] text-white px-3 py-3 rounded-lg'>Invoice</button> */}
                    <button className='bg-[#ab7a5f] text-white px-3 py-2 flex space-x-2'>
                        <FontAwesomeIcon icon={faFileInvoice} className='h-5 w-5 mr-2' />
                        VIEW INVOICE
                    </button>


                </div>
                <p className='text-slate-400 pb-10 border-b  border-slate-300'>order Date : <span className='text-[#ab7a5f] '>{DateFormatter(order.order_date)}</span></p>

                {order?.products?.map((product, index) => (
                    <div className="flex py-5 items-center justify-between pb-5 border-b border-slate-300">
                        <div className="flex">
                            <Image style={{ borderRadius: "10px" }} width={80} height={80} src={product.pid.images[0]} />
                            <div className='ml-8'>
                                <p className='text-lg font-semibold mb-2'>{product.pid.name}</p>
                                <p className='mb-1'>category</p>
                                <div className="flex items-center space-x-2">
                                    <p >color : </p>
                                    <div
                                        key={index}
                                        className="w-5 h-5 relative bg-white rounded-full p-2"
                                        style={{ backgroundColor: product.color.hexCode }}
                                    >
                                    </div>
                                    <p>{product.color.name}</p>
                                </div>                            
                            </div>
                        </div>
                        <div className='text-right'>
                            <p className='text-xl font-semibold'>${product.pid.price * product.qty}</p>
                            <p>Qty : {product.qty}</p>

                        </div>
                    </div>
                ))}

                <div className="flex py-10 justify-between">
                    <div className='w-1/2 text-left' >
                        <p className="text-xl font-semibold">Payment</p>
                        <p className="text-lg uppercase">{order.payment_method}</p>
                        <p className="text-lg uppercase">{order.payment_status}</p>
                    </div>
                    <div className='w-1/2 text-left'>
                        <p className="text-xl font-semibold mb-2">Delivary</p>
                        <p className='text-[#ab7a5f] mb-2'>Address</p>
                        <p className=' max-w-[50%] mr-auto break-words tracking-wider'>
                            {order.shipping_address}
                        </p>
                    </div>
                </div>

                <button onClick={() => router.back()} className='ml-auto block px-4 py-3 bg-[#ab7a5f] rounded-lg text-white'>Go Back</button>
            </div>
        </div>
    )
}

export default Order