import DefaultLayout from '@/src/components/admin/Layouts/DefaultLayout'
import Order from '@/src/components/admin/Orders/Order'
import React from 'react'

const Page = () => {
  return (
    <>
      <DefaultLayout>
        <Order />
      </DefaultLayout>
    </>
  )
}

export default Page