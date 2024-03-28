'use client';

import React, { useState } from 'react'
import Input from '../FormElements/input';
import TextArea from '../FormElements/text-area';
import Select from '../FormElements/select';
import Checkbox from '../FormElements/checkbox';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PRODUCT, GET_ALL_CATEGORIES, GET_ALL_BRANDS, GET_ALL_COLORS } from '@/apollo/client/query';
import { toast } from 'react-toastify';
import UploadDrop from '../../UploadDrop';

const AddProduct = () => {

    const [formData, setFormData] = useState({
        name: "",
        price: 0,
        description: "",
        stock: 0,
        brand: "",
        category: "",
        sku: "",
        colors: [],
        images: [],
        freeShipping: false
    });
    console.log("🚀 ~ AddProduct ~ formData:", formData)


    const [colors, setColors] = useState([]);

    const [AddProduct] = useMutation(ADD_PRODUCT)

    const { data: categoryData, loading: categoryLoading, error: categoryError } = useQuery(GET_ALL_CATEGORIES);
    const { data: brandData, loading: brandLoading, error: brandError } = useQuery(GET_ALL_BRANDS);
    const { data: colorData, loading: colorLoading, error: colorError } = useQuery(GET_ALL_COLORS);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSelectImages = (url) => {
        setFormData((prevData) => ({
            ...prevData,
            images: [...prevData.images, url],
        }));
    }

    const handleSelectColors = (e) => {

        let id = e.target.value
        const colorIndex = colorData?.getAllColors?.findIndex(color => color?._id.toString() === id.toString());

        if (colorIndex !== -1) {
            setColors([...colors, { name: colorData?.getAllColors[colorIndex].name, hexCode: colorData?.getAllColors[colorIndex].hexCode }]);
        }

        setFormData((prevData) => ({
            ...prevData,
            colors: [...prevData.colors, id],
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { price, stock, ...rest} = formData

        AddProduct({
            variables: {
                input: {
                    price: parseInt(price),
                    stock: parseInt(stock),
                    ...rest
                }
            }
        }).then(async (res) => {
            toast.success("product added successfully");
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
                                required={true}
                                placeholder={"Enter product name"}
                                onChange={handleInputChange}
                            />

                            <TextArea
                                className={"w-full mb-6"}
                                label={"Description"}
                                type={"text"}
                                name={"description"}
                                required={true}
                                placeholder={"Type product description"}
                                onChange={handleInputChange}
                            />

                            <div className="flex">

                                <Input
                                    className={"w-1/3 mb-6 mr-10"}
                                    label={"Price"}
                                    type={"number"}
                                    name={"price"}
                                    required={true}
                                    placeholder={"Enter product price"}
                                    onChange={handleInputChange}
                                />

                                <Input
                                    className={"w-1/3 mb-6"}
                                    label={"Stock"}
                                    type={"number"}
                                    name={"stock"}
                                    required={true}
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
                                    required={true}
                                    selectData={brandData?.getAllBrands}
                                    onChange={handleInputChange}
                                />

                                <Select
                                    className={"w-1/3 mb-6"}
                                    label={"Category"}
                                    name={"category"}
                                    defaultValue={"Select Category"}
                                    required={true}
                                    selectData={categoryData?.getAllCategories}
                                    onChange={handleInputChange}
                                />

                            </div>

                            <div className="mb-6 col-span-5 xl:col-span-2">
                                <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                                    <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                                        <h3 className="font-medium text-black dark:text-white">
                                            Select Product's Images  <span className="text-meta-1">*</span>
                                        </h3>
                                    </div>
                                    <div className="p-7">
                                        <UploadDrop handleSelectImages={handleSelectImages} />
                                        <div className="flex space-x-5 mt-5">
                                            {formData?.images?.map((url) => (
                                                <img src={url} alt='' width={100} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <Select
                                    className={"w-1/3 mb-6"}
                                    label={"Colors"}
                                    name={"colors"}
                                    value={formData.colors ? formData.colors[formData.colors.length - 1] : "Select Colors"}
                                    defaultValue={"Select Colors"}
                                    selectData={colorData?.getAllColors}
                                    required={true}
                                    onChange={handleSelectColors}
                                />

                                <div className='p-5 grid grid-cols-6  gap-3 w-3/4'>
                                    {colors?.map((color, index) => (
                                        <div key={index} className="px-3">
                                            <div className="">
                                                <div className="w-10 mx-auto h-10 relative bg-white rounded-full p-2"
                                                    style={{ backgroundColor: color.hexCode }}>
                                                    <svg className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black opacity-0 transition-all duration-200 ease-in-out hover:cursor-pointer hover:opacity-100" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M14.95 5.05a1 1 0 0 0-1.41 0L10 8.59l-3.54-3.54a1 1 0 1 0-1.41 1.41L8.59 10l-3.54 3.54a1 1 0 0 0 1.41 1.41L10 11.41l3.54 3.54a1 1 0 0 0 1.41-1.41L11.41 10l3.54-3.54a1 1 0 0 0 0-1.41z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </div>

                                            <p className='text-center'>{color.name}</p>
                                        </div>
                                    ))}
                                </div>

                            </div>

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
                                    value={formData.freeShipping}                                   
                                    onChange={(e) => setFormData((prevData) => ({
                                        ...prevData,
                                        freeShipping: e.target.checked
                                    }))}
                                />
                            </div>

                            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                Add Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddProduct