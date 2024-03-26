'use client'

import React from 'react'
import AllProducts from '@/src/components/admin/Product/AllProducts'
import DefaultLayout from '@/src/components/admin/Layouts/DefaultLayout'


const Page = () => {
    return (
        <>
            <DefaultLayout>
                <AllProducts />
            </DefaultLayout>
        </>
    )
}

export default Page