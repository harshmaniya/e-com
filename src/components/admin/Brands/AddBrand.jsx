'use client'

import React, { useState } from 'react';
import Input from '../FormElements/input';
import { useMutation } from '@apollo/client';
import { ADD_BRAND } from '@/apollo/client/query';
import { toast } from 'react-toastify';

const AddBrand = () => {
    const [formData, setFormData] = useState('');  
    const [addBrand] = useMutation(ADD_BRAND);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData) {
            toast.error('Brand Name is required.');
            return;
        }
        try {
            await addBrand({
                variables: {
                    name: formData,
                },
            });
            toast.success('Brand Added successfully');         
            setFormData('');
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Create New Brand
                    </h3>
                </div>
                <form id="add_brand" onSubmit={handleSubmit}>
                    <div className="p-6.5">
                        <Input
                            label="Brand Name"
                            type="text"
                            id="name"
                            name="name"
                            value={formData}
                            placeholder="Enter brand name"
                            onChange={(e)=>setFormData(e.target.value)}
                            className={"w-full mb-6"}
                        />

                        <button
                            type="submit"
                            className="flex w-1/3 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                        >
                            Add Brand
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBrand;