'use client'

import { GET_ALL_CATEGORY, GET_ALL_BRANDS, GET_ALL_COLORS } from '@/apollo/client/query'
import { useQuery } from '@apollo/client'
import React from 'react'

const sideBar = () => {

    const { data, loading } = useQuery(GET_ALL_CATEGORY)
    const { data: brandData } = useQuery(GET_ALL_BRANDS)
    const { data: colorsData } = useQuery(GET_ALL_COLORS)
    console.log("🚀 ~ sideBar ~ colorsData:", colorsData)
    
    return (
        <div>
            <input type="text" className="border rounded py-2 px-3 bg-slate-300" />
            <p>Category</p>
            {
                data ?
                    data?.getAllCategories?.map((cdata) => (
                        <p>{cdata.name}</p>
                    ))
                    :
                    <h1>loading...</h1>
            }

            <p>Company</p>
            {
                brandData ?
                    brandData?.getAllBrands?.map((bdata) => (
                        <p>{bdata.name}</p>
                    ))
                    :
                    <h1>loading...</h1>
            }

            <p>Colors</p>
            {
                colorsData ?
                    colorsData?.getAllColors?.map((color) => (
                        <>
                            <p>{color.name}</p>
                            <p>{color.hexCode}</p>
                        </>
                    ))
                    :
                    <h1>loading...</h1>
            }

        </div>
    )
}

export default sideBar