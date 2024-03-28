'use client'

import React, { useEffect, useState } from 'react'
import AllProducts from '@/src/components/admin/Product/AllProducts'
import DefaultLayout from '@/src/components/admin/Layouts/DefaultLayout'
import Loader from '@/src/components/admin/Loader'


const Page = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);
    return (
        <>
            <DefaultLayout>
                {loading ? <Loader /> : <AllProducts />}
            </DefaultLayout>
        </>
    )
}

export default Page