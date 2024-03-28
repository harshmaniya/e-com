"use client"

import React from 'react'

import AddBrand from "@/src/components/admin/Brands/AddBrand";
import DefaultLayout from "@/src/components/admin/Layouts/DefaultLayout";

const page = ({params}) => {
    const id = params.id

  return (
    <DefaultLayout>
        <AddBrand id={id}/>
      </DefaultLayout>
  )
}

export default page