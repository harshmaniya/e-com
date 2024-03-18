'use client';

import React from 'react'
import SelectGroupOne from '../SelectGroup/SelectGroupOne';
import { useForm } from "react-hook-form"
import Input from '../FormElements/input';
import TextArea from '../FormElements/text-area';
import Select from '../FormElements/select';


const productData = [
    {
        "_id": "65eea58c3d992c8735a2dab6",
        "name": "Suede Armchair",
        "price": 159,
        "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
        "stock": 100,
        "inStock": true,
        "brand": "65eea2163d992c8735a2daa3",
        "category": "65eea2d93d992c8735a2daa9",
        "sku": "RecroK1VD8qVdMP5H",
        "colors": [
            "65eea3ed3d992c8735a2dab2"
        ],
        "images": [
            "https://www.course-api.com/images/store/product-16.jpeg",
            "https://www.course-api.com/images/store/extra-product-1.jpeg",
            "https://www.course-api.com/images/store/extra-product-2.jpeg",
            "https://www.course-api.com/images/store/extra-product-3.jpeg",
            "https://www.course-api.com/images/store/extra-product-4.jpeg"
        ],
        "freeShipping": false,
        "__v": 0
    }
]



const AddProduct = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        console.log("🚀 ~ onSubmit ~ data:", data)
    }

    return (
        <>
            <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Create New Product
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}  >
                        <div className="p-6.5">

                            <Input
                                className={"w-full mb-6"}
                                label={"Product Name"}
                                type={"text"}
                                placeholder={"Enter product name"}
                                required={true}
                                {...register("name", { required: true })}
                                errors={errors.name}
                            />

                            <TextArea
                                className={"w-full mb-6"}
                                label={"Description"}
                                type={"text"}
                                placeholder={"Type product description"}
                                required={true}
                                {...register("name", { required: true })}
                                errors={errors.name}
                            />

                            <Input
                                className={"w-1/3 mb-6"}
                                label={"Stock"}
                                type={"number"}
                                placeholder={"Enter available stock"}
                                required={true}
                                {...register("name", { required: true })}
                                errors={errors.name}
                            />


                            <div className="mb-4.5">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    placeholder="Select subject"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>

                            {/* <SelectGroupOne /> */}
                            <Select data={productData} />

                            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddProduct

