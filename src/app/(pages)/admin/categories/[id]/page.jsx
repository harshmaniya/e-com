"use client"

import AddCategory from "@/src/components/admin/Categories/AddCategoty";
import DefaultLayout from "@/src/components/admin/Layouts/DefaultLayout";
const page = ({params}) => {
    const id = params.id

  return (
    <>
      <DefaultLayout>
        <AddCategory id={id}/>
      </DefaultLayout>
    </>
  );
}

export default page