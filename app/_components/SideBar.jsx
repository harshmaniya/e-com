'use client'

import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { GET_ALL_CATEGORY, GET_ALL_BRANDS, GET_ALL_COLORS } from '@/apollo/client/query'

const sideBar = () => {

    const { data } = useQuery(GET_ALL_CATEGORY)
    const { data: brandData } = useQuery(GET_ALL_BRANDS)
    const { data: colorsData, loading: colorsLoading } = useQuery(GET_ALL_COLORS)
    console.log("🚀 ~ sideBar ~ data:", data)

    // const [category, setCategory] = useState()

    return (
        <div>
            <input type="text" className="border rounded py-2 px-3 bg-slate-300" />
            {
                data ?
                    <>
                        <p className='text-xl font-bold'>Category</p>
                        {
                            data?.getAllCategories?.map((cdata) => (
                                <p>{cdata.name}</p>
                            ))
                        }
                    </>
                    :
                    <h1>loading...</h1>
            }


            {
                brandData ?
                    <>
                        <p className='text-xl font-bold'>Company</p>
                        {
                            brandData?.getAllBrands?.map((bdata) => (
                                <p>{bdata.name}</p>
                            ))
                        }
                    </>
                    :
                    <h1>loading...</h1>
            }

            {colorsLoading ? (
                <h1>Loading colors...</h1>
            ) : (
                <>
                    <p className='text-xl font-bold'>Colors</p>
                    <div className='flex'>
                        {colorsData?.getAllColors?.map((color) => (
                            <div key={color.id}>
                                <div style={{ width: '20px', height: '20px', backgroundColor: color.hexCode, borderRadius: '50%', padding: '10px' }}></div>
                            </div>
                        ))}
                    </div>
                </>
            )}

        </div>
    )
}

export default sideBar