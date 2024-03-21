'use client';

import React, { useState } from 'react'
import SideBar from '@/src/components/Client/SideBar'
import { GET_ALL_PRODUCTS } from '@/apollo/client/query';
import ProductCard from '@/src/components/Client/ProductCard';
import { useQuery } from '@apollo/client';
import Link from 'next/link';

const products = () => {

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [isFreeShippingSelected, setIsFreeShippingSelected] = useState(false);
    const [search, setSearch] = useState("");

    const { data } = useQuery(GET_ALL_PRODUCTS, {
        variables: {
            input: {
                brands: selectedBrands,
                categories: selectedCategories,
                colors: selectedColors,
                search,
                freeShipping: isFreeShippingSelected
            }
        }
    })


    console.log("🚀 ~ products ~ data:", data?.getAllProducts)

    return (
        <>
            <div className='max-w-[90%] md:container mx-auto'>
                <div className="flex justify-center mt-10 min-h-[56.7vh]">
                    <div className='w-1/4 sticky top-0 left-0'>
                        <SideBar
                            selectedCategories={selectedCategories}
                            setSelectedCategories={setSelectedCategories}
                            selectedBrands={selectedBrands}
                            setSelectedBrands={setSelectedBrands}
                            selectedColors={selectedColors}
                            setSelectedColors={setSelectedColors}
                            isFreeShippingSelected={isFreeShippingSelected}
                            setIsFreeShippingSelected={setIsFreeShippingSelected}
                            search={search}
                            setSearch={setSearch}
                        />
                    </div>

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
            </div>
        </>
    )
}

export default products