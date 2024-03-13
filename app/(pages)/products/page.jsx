'use client';

import React from 'react'
import "../../globals.css";
import SideBar from '@/app/_components/SideBar'
import { GET_ALL_PRODUCTS } from '@/apollo/client/query';
import ProductCard from '@/app/_components/ProductCard';
import { useQuery } from '@apollo/client';
import Link from 'next/link';

const products = () => {

    const { data, loading, error } = useQuery(GET_ALL_PRODUCTS)
    console.log("🚀 ~ products ~ data:", data?.getAllProducts)

    return (
        <>
            <div className="flex justify-center">
                <SideBar />
                <div className='flex gap-8'>
                    {data ?
                        data?.getAllProducts?.map((pdata) => (
                            <Link href={`/products/` + pdata?._id}>
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