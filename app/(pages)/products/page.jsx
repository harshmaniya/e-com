'use client';

import React from 'react'
import "../../globals.css";
import { GET_ALL_PRODUCTS } from '@/apollo/client/query';
import ProductCard from '@/app/_components/ProductCard';
import { useQuery } from '@apollo/client';

const products = () => {

    const { data, loading, error } = useQuery(GET_ALL_PRODUCTS)
    console.log("🚀 ~ products ~ data:", data?.getAllProducts)

    return (
        <>
            <div className='flex gap-8'>
                {data ?
                    data?.getAllProducts?.map((pdata) => (
                        <ProductCard
                            name={pdata.name}
                            img={pdata.images[0]}
                            price={pdata.price}
                        />
                    ))
                    :
                    <h1>loading...</h1>
                }
            </div>
        </>
    )
}

export default products