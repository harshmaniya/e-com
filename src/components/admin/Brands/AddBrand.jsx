'use client'

import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import Input from '../FormElements/input';

const AddBrand = () => {

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
                            Create New Brand
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="p-6.5">
                            <Input
                                className={"w-full mb-6"}
                                label={"Brand Name"}
                                type={"text"}
                                placeholder={"Enter brand name"}
                                required={true}
                                {...register("name", { required: true })}
                                errors={errors.name}
                            />

                            <button type="submit" className="flex w-1/3 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                Add Brand
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddBrand