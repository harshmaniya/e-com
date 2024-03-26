'use client';

import React, { useState } from 'react'
// import { useForm } from "react-hook-form"
import Input from '../FormElements/input';
import TextArea from '../FormElements/text-area';
import Select from '../FormElements/select';
import Image from 'next/image';
import ColorPicker from '../FormElements/colorPicker';
import Checkbox from '../FormElements/checkbox';
import { useMutation, useQuery } from '@apollo/client';
// import { useRouter } from 'next/navigation';
import { ADD_PRODUCT, GET_ALL_CATEGORIES, GET_ALL_BRANDS } from '@/apollo/client/query';
import { toast } from 'react-toastify';

const AddProduct = () => {

    const [formData, setFormData] = useState({
        name: "",
        price: 0,
        description: "",
        stock: 0,
        inStock: true,
        brand: "",
        category: "",
        sku: "",
        colors: [],
        images: [],
        freShipping: false
    });

    // const [colors, setColors] = useState([]);

    const [AddProduct] = useMutation(ADD_PRODUCT)
    const { data: categoryData, loading: categoryLoading, error: categoryError } = useQuery(GET_ALL_CATEGORIES);
    const { data: brandData, loading: brandLoading, error: brandError } = useQuery(GET_ALL_BRANDS);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    console.log("🚀 ~ Product ~ formData:", formData)
    const handleSubmit = async (e) => {
        e.preventDefault();
        AddProduct({
            variables: {
                input: {
                    ...formData
                }
            }
        }).then(async (res) => {
            // localStorage.setItem("accessToken", res.data.login.accessToken)
            toast.success("login successfully");
            // router.push('/')
        }).catch((err) => {
            toast.error(err.message);
        })
    };

    return (
        <>
            <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Create New Product
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit}  >
                        <div className="p-6.5">

                            <Input
                                className={"w-full mb-6"}
                                label={"Product Name"}
                                type={"text"}
                                name={"name"}
                                placeholder={"Enter product name"}
                                onChange={handleInputChange}
                            />

                            <TextArea
                                className={"w-full mb-6"}
                                label={"Description"}
                                type={"text"}
                                name={"description"}
                                placeholder={"Type product description"}
                                onChange={handleInputChange}
                            />

                            <div className="flex">

                                <Input
                                    className={"w-1/3 mb-6 mr-10"}
                                    label={"Price"}
                                    type={"number"}
                                    name={"price"}
                                    placeholder={"Enter product price"}
                                    onChange={handleInputChange}
                                />

                                <Input
                                    className={"w-1/3 mb-6"}
                                    label={"Stock"}
                                    type={"number"}
                                    name={"stock"}
                                    placeholder={"Enter available stock"}
                                    onChange={handleInputChange}
                                />

                            </div>

                            <div className="flex">

                                <Select
                                    className={"w-1/3 mb-6 mr-10"}
                                    label={"Brand"}
                                    name={"brand"}
                                    defaultValue={"Select Brand"}
                                    selectData={brandData?.getAllBrands}
                                    onChange={handleInputChange}
                                />

                                <Select
                                    className={"w-1/3 mb-6"}
                                    label={"Category"}
                                    name={"category"}
                                    defaultValue={"Select Category"}
                                    selectData={categoryData?.getAllCategories}
                                    onChange={handleInputChange}
                                />

                            </div>

                            <div className="mb-6 col-span-5 xl:col-span-2">
                                <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                                    <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                                        <h3 className="font-medium text-black dark:text-white">
                                            Select Product's Images
                                        </h3>
                                    </div>
                                    <div className="p-7">
                                        <form>
                                            <div
                                                id="FileUpload"
                                                className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                                            >
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                                                />
                                                <div className="flex flex-col items-center justify-center space-y-3">
                                                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                                                        <svg
                                                            width="16"
                                                            height="16"
                                                            viewBox="0 0 16 16"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                                                                fill="#3C50E0"
                                                            />
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                                                                fill="#3C50E0"
                                                            />
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                                                                fill="#3C50E0"
                                                            />
                                                        </svg>
                                                    </span>
                                                    <p>
                                                        <span className="text-primary">Click to upload</span> or
                                                        drag and drop
                                                    </p>
                                                    <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                                                    <p>(max, 800 X 800px)</p>
                                                </div>
                                            </div>

                                            <div className="h-14 w-14 rounded-full">
                                                <Image src={""} alt='' width={200} height={200} />
                                            </div>

                                            <div className="flex justify-end gap-4.5">
                                                <button
                                                    className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                                    type="submit"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                                                    type="submit"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            {/* <ColorPicker colors={colors} setColors={setColors} /> */}

                            <div className="flex items-center">

                                <Input
                                    className={"w-1/3 mb-6 mr-10"}
                                    label={"SKU"}
                                    type={"text"}
                                    name={"sku"}
                                    placeholder={"Enter sku"}
                                    required={true}
                                    onChange={handleInputChange}
                                />

                                <Checkbox
                                    label={"Free Shipping"}
                                />

                            </div>

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