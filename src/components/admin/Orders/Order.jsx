"use client"

import { GET_ORDER } from '@/apollo/client/query'
import { useMutation, useQuery } from '@apollo/client'
import { faCheckCircle, faClipboardCheck, faCog, faFileDownload, faHourglassStart, faStopwatch, faTruck, } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'


const Order = () => {
    const statuses = ['accept', 'processing', 'readyToShip', 'shipped', 'delivered'];
    const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
    const currentStatus = statuses[currentStatusIndex];

    const { id } = useParams(); 

    const { data, loading, error } = useQuery(GET_ORDER, {
        variables: {
            orderId: id
        }
    })
    console.log("🚀 ~ file: Order.jsx:Order ~ data:", data);



    const handleClick = () => {
        if (currentStatusIndex < statuses.length - 1) {
            setCurrentStatusIndex(prevIndex => prevIndex + 1);
        }
    };





    return (
        <div className="container mx-auto ">
            <div className="flex justify-between items-center">
                <h1>Order Details</h1>
                <button onClick={handleClick} className="bg-[#1e242e] hover:bg-[#101725] text-white font-bold py-2 px-4 rounded">
                    {currentStatus}
                </button>
            </div>
            <div className="flex justify-between">
                <div className="w-4/6 py-10 mr-5">
                    <div className=' rounded-md p-5 border border-slate-300'>
                        <div className="bg-[#1c2434] flex justify-between items-center p-10 rounded-t-md text-white">
                            <div>
                                <p className='text-2xl tracking-wider'>Order : OrderID</p>
                                <p>Placed Order Date</p>
                            </div>
                            <div>
                                <button className=' text-white px-2 py-2 flex space-x-2 bg-[#ffffff] rounded-lg'>
                                    <FontAwesomeIcon icon={faFileDownload} className='h-5 w-5 text-[#1c2434]' />
                                </button>
                            </div>

                        </div>
                        <div className="rounded-b-md min-h-[570px] overflow-auto">

                            <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                                <div className="col-span-3 flex items-center">
                                    <p className="font-medium">Product</p>
                                </div>
                                <div className="col-span-2 hidden items-center sm:flex">
                                    <p className="font-medium">Category</p>
                                </div>
                                <div className="col-span-1 flex items-center">
                                    <p className="font-medium">Price</p>
                                </div>
                                <div className="col-span-1 flex items-center">
                                    <p className="font-medium">Quantity</p>
                                </div>
                                <div className="col-span-1 flex items-center">
                                    <p className="font-medium">Amount</p>
                                </div>
                            </div>

                            {data?.getOrder.products.map((product, key) => (
                                <div
                                    className="grid grid-cols-6 border-t text-[#1c2434]  text-base border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"

                                >
                                    <div className="col-span-3 flex items-center">
                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                            <div className="h-15 w-15 rounded-md">
                                                <Image
                                                    src={product[0].pid.images[0]}
                                                    width={60}
                                                    height={50}
                                                    alt="Product"
                                                />
                                            </div>
                                            <p className=" text-black dark:text-white">
                                                yfbvhgfhg
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-span-2 hidden items-center sm:flex">
                                        <p className=" text-black dark:text-white">
                                            mbhfgh
                                        </p>
                                    </div>
                                    <div className="col-span-1 flex items-center">
                                        <p className=" text-black dark:text-white">
                                            1232
                                        </p>
                                    </div>
                                    <div className="col-span-1 flex items-center">
                                        <p className=" text-black dark:text-white">4</p>
                                    </div>
                                    <div className="col-span-1 flex items-center">
                                        <p className=" text-meta-3">34456</p>
                                    </div>
                                </div>
                            ))}

                            <div
                                className="grid grid-cols-6 border-t border-stroke px-4 py-10 pb-10 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"

                            >
                                <div className="col-span-5 ">

                                    <p className="font-semibold text-lg items-start text-black dark:text-white">
                                        Note
                                    </p>
                                    <p className=' max-w-[50%] mr-auto break-words tracking-wider'>njbgsfretrcwerfvbjyhtfgte4rfghuredcrewscdvtgrvefdcgvredfwvbsgaxescfwxs</p>
                                </div>

                                <div className="col-span-2 text-left flex items-start flex-col">
                                    <p className=" py-2 text-black dark:text-white">total</p>
                                    <p className=" py-2 text-black dark:text-white border-b border-stroke w-full ">shipping</p>
                                    <p className=" py-2 pt-5 text-black dark:text-white">order Total</p>
                                </div>
                                <div className="col-span-1 text-left flex items-start flex-col">
                                    <p className=" font-bold py-2 text-black dark:text-white">40909</p>
                                    <p className=" font-bold py-2 text-black dark:text-white  border-b border-stroke w-full">400</p>
                                    <p className=" font-bold py-2 pt-5 text-black dark:text-white">51228</p>
                                </div>

                            </div>



                        </div>
                    </div>

                </div>
                <div className="w-1/3   py-10 ml-5">
                    <div className=' min-h-[748px] rounded-md p-5 border border-slate-300'>

                        <h1 className='text-2xl'>Order Status</h1>
                        <div>
                            <div className="flex pt-5 justify-between items-center">
                                <div className="flex w-3/4 justify-between">
                                    <div className={`border border-[#22b167] rounded-full w-12 h-12 flex justify-center items-center ${currentStatus === 'accept' ? 'border-graydark' : ' border-[#22b167]'}`}>

                                        <FontAwesomeIcon style={{ fontSize: "25px", color: currentStatus === 'accept' ? "rgb(51, 58, 72)" : "rgb(34, 177, 103)", }} icon={faClipboardCheck} />
                                    </div>
                                    <div>
                                        <p>accept</p>
                                        <p>27 july 2020</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        {currentStatus === 'accept' ? (
                                            <FontAwesomeIcon style={{ fontSize: "25px" }} icon={faStopwatch} />
                                        ) : (
                                            <FontAwesomeIcon style={{ fontSize: "25px", color: "rgb(34, 177, 103)" }} icon={faCheckCircle} />
                                        )}

                                    </div>
                                </div>

                            </div>
                            <div className="h-18 border-dashed border-l-2 ml-[22px]"></div>
                            <div className="flex  justify-between items-center">
                                <div className="flex w-3/4 justify-between">
                                    <div className='border border-[#22b167]  rounded-full w-12 h-12 flex justify-center items-center'>

                                        <FontAwesomeIcon style={{ fontSize: "25px", color: currentStatus === 'processing' ? "rgb(51, 58, 72)" : "rgb(34, 177, 103)", }} icon={faHourglassStart} />
                                    </div>
                                    <div>
                                        <p>proccecing</p>
                                        <p>27 july 2020</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <FontAwesomeIcon style={{ fontSize: "25px", }} icon={faStopwatch} />
                                        <FontAwesomeIcon style={{ fontSize: "25px", color: "rgb(34, 177, 103)" }} icon={faCheckCircle} />
                                    </div>
                                </div>

                            </div>
                            <div className="h-18 border-dashed border-l-2 ml-[22px]"></div>
                            <div className="flex  justify-between items-center">
                                <div className="flex w-3/4 justify-between">
                                    <div className='border border-[#22b167]  rounded-full w-12 h-12 flex justify-center items-center'>

                                        <FontAwesomeIcon style={{ fontSize: "25px", color: "rgb(34, 177, 103)" }} icon={faCog} />
                                    </div>
                                    <div>
                                        <p>readyToShip</p>
                                        <p>27 july 2020</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <FontAwesomeIcon style={{ fontSize: "25px" }} icon={faStopwatch} />
                                        <FontAwesomeIcon style={{ fontSize: "25px", color: "rgb(34, 177, 103)" }} icon={faCheckCircle} />
                                    </div>
                                </div>

                            </div>
                            <div className="h-18 border-dashed border-l-2 ml-[22px]"></div>
                            <div className="flex  justify-between items-center">
                                <div className="flex w-3/4 justify-between">
                                    <div className='border border-[#22b167]  rounded-full w-12 h-12 flex justify-center items-center'>

                                        <FontAwesomeIcon style={{ fontSize: "25px", color: currentStatus === 'readyToShip' ? "rgb(51, 58, 72)" : "rgb(34, 177, 103)", }} icon={faTruck} />
                                    </div>
                                    <div>
                                        <p>shipped</p>
                                        <p>27 july 2020</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <FontAwesomeIcon style={{ fontSize: "25px" }} icon={faStopwatch} />
                                        <FontAwesomeIcon style={{ fontSize: "25px", color: "rgb(34, 177, 103)" }} icon={faCheckCircle} />
                                    </div>
                                </div>

                            </div>
                            <div className="h-18 border-dashed border-l-2 ml-[22px]"></div>
                            <div className="flex  justify-between items-center">
                                <div className="flex w-3/4 justify-between">
                                    <div className='border border-[#22b167]  rounded-full w-12 h-12 flex justify-center items-center'>

                                        <FontAwesomeIcon style={{ fontSize: "25px", color: "rgb(34, 177, 103)" }} icon={faCheckCircle} />
                                    </div>
                                    <div>
                                        <p>delivered</p>
                                        <p>27 july 2020</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <FontAwesomeIcon style={{ fontSize: "25px" }} icon={faStopwatch} />
                                        <FontAwesomeIcon style={{ fontSize: "25px", color: "rgb(34, 177, 103)" }} icon={faCheckCircle} />
                                    </div>
                                </div>

                            </div>
                        </div>


                    </div>
                </div>
            </div>

            <div className="p-10 border border-slate-300 shadow-xl flex justify-between items-start rounded-md">
                <div>
                    <p>Customer Details :</p>
                    <p className='text-xl font-bold text-black'>Customer Name</p>
                    <p>address</p>
                    <p>address</p>
                </div>
                <div>
                    <p>NO. 9903812958</p>
                    <p>email sbdckj@af.fes</p>
                    <p>Payment method</p>
                    <p>date and time</p>
                </div>
            </div>
        </div>
    )
}

export default Order
