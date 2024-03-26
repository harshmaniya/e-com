'use client'

import React from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';

const page = () => {
    return (
        <div className='container mx-auto'>
            <div className="w-3/4 mx-auto bg-[#fffaf8] py-10  px-10 mt-15 rounded-lg shadow-lg drop-shadow-sm">

                <div className="flex justify-between items-center">
                    <p className='text-xl mb-3'>Order-ID : <span>7886098709</span></p>
                    {/* <button className='bg-[#ab7a5f] text-white px-3 py-3 rounded-lg'>Invoice</button> */}
                    <button className='bg-[#ab7a5f] text-white px-3 py-2 flex space-x-2'>
                        <FontAwesomeIcon icon={faFileInvoice} className='h-5 w-5 mr-2' />
                        VIEW INVOICE
                    </button>


                </div>
                <p className='text-slate-400 pb-10 border-b  border-slate-300'>order Date : <span className='text-[#ab7a5f] '>nvthbvfdhtfhg</span></p>

                <div className="flex py-5 items-center justify-between pb-5 border-b border-slate-300">
                    <div className="flex">
                        <Image style={{ borderRadius: "10px" }} width={80} height={80} src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Ambersweet_oranges.jpg/1200px-Ambersweet_oranges.jpg" />
                        <div className='ml-8'>
                            <p className='text-lg font-semibold mb-2'>product's name</p>
                            <p className='mb-1'>product's category</p>
                            <div className="flex">
                                <p >color :</p>
                                <p className='h-5 w-5 rounded-full bg-black ml-2'></p>
                            </div>
                        </div>
                    </div>
                    <div className='text-right'>
                        <p className='text-xl font-semibold'> $2345</p>
                        <p>Qty : 2</p>

                    </div>
                </div>
                <div className="flex py-10 justify-between">
                    <div className='w-1/2 text-left' >
                        <p className="text-xl font-semibold">Payment</p>
                    </div>
                    <div className='w-1/2 text-left'>
                        <p className="text-xl font-semibold mb-2">Delivary</p>
                        <p className='text-[#ab7a5f] mb-2'>Address</p>
                        <p className=' max-w-[50%] mr-auto break-words tracking-wider'>
                            Shop No.-G2, Velocity Business Hub Near Madhuvan Circle LP Savani Road, Pal, Adajan, Surat, Gujarat 395009
                        </p>
                    </div>
                </div>

                <button className='ml-auto block px-4 py-3 bg-[#ab7a5f] rounded-lg text-white'>Go Back</button>
            </div>
        </div>
    )
}

export default page