import DefaultLayout from '@/src/components/admin/Layouts/DefaultLayout'
import AddProduct from '@/src/components/admin/Product/AddProduct'
import React from 'react'

const Page = () => {
  return (
    <>
      <DefaultLayout>
        <AddProduct />
      </DefaultLayout>
    </>
  )
}

export default Page