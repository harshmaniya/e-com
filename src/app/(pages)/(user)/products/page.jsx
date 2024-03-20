'use client';

import React from 'react'
import SideBar from '@/src/components/Client/SideBar'
import { GET_ALL_PRODUCTS } from '@/apollo/client/query';
import ProductCard from '@/src/components/Client/ProductCard';
import { useQuery } from '@apollo/client';
import Link from 'next/link';

const products = () => {

    const { data } = useQuery(GET_ALL_PRODUCTS)
    console.log("🚀 ~ products ~ data:", data?.getAllProducts)

    return (
        <>
            <div className="flex justify-center gap-10 mt-10">
                <SideBar />
                <div className='flex gap-8'>
                    {data ?
                        data?.getAllProducts?.map((pdata, index) => (
                            <Link key={index} href={`/products/` + pdata?._id}>
                                <ProductCard
                                    name={pdata?.name}
                                    img={pdata?.images[0]}
                                    price={pdata?.price}
                                />
                            </Link>
                        ))
                        :
                        <h1>loading...</h1>
                    }
                </div>
            </div>
        </>
    )
}

export default products