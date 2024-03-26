'use client';

import React, { Suspense, useState } from 'react'
import SideBar from '@/src/components/Client/SideBar'
import { GET_ALL_PRODUCTS } from '@/apollo/client/query';
import ProductCard from '@/src/components/Client/ProductCard';
import { useQuery } from '@apollo/client';
import Loader from '@/src/components/Loader';
import { useRouter } from 'next/navigation';

const products = () => {

    const router = useRouter();

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

    const goToTheProduct = (id) => {
        router.push(`products/${id}`)
    }


    console.log("🚀 ~ products ~ data:", data?.getAllProducts)

    return (


        <div className="px-34">
            <div className="flex p-4">
                <div className="w-1/4">

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

                <div className='w-3/4 grid grid-cols-4 grid-flow-col gap-5'>

                    {data?.getAllProducts && data?.getAllProducts?.map((product) => (
                        <div key={product?._id} onClick={() => goToTheProduct(product._id)}>
                            <Suspense fallback={<Loader />}>
                                <ProductCard product={product} />
                            </Suspense>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default products

{/* <div className='max-w-[90%] md:container mx-auto'>
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
                            <Loader />
                        }
                    </div>
                </div>
            </div> */}