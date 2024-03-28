"use client"

import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/navigation'
import ProductCard from '@/src/components/Client/ProductCard'
import { GET_WISHLIST } from '@/apollo/client/query'

const page = () => {

    const router = useRouter()
    const { data, error, loading, refetch } = useQuery(GET_WISHLIST,{fetchPolicy:"network-only"})
    console.log("🚀 ~ page ~ data:", data)

    const goToTheProduct = (id) => {
        router.push(`products/${id}`)
    }

    return (
        <div div className='px-34 mx-auto pt-8 min-h-screen' >
            <h1 className='font-bold text-3xl  border-b-2 inline-block pb-1 mb-10'>Wishlisted Products</h1>
            <div className="grid grid-cols-5 gap-5">
                {
                    data?.getWishlist?.products?.map((product) => (
                        <ProductCard product={product} goToTheProduct={goToTheProduct} wishListed={true}  refetch={refetch}/>
                    ))
                }
            </div>
        </div>
    )
}

export default page