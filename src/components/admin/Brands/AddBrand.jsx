'use client'


import React, { useState,useEffect } from 'react';
import Input from '../FormElements/input';
import { useMutation,useQuery } from '@apollo/client';
import { ADD_BRAND,GET_BRAND_BY_ID,UPDATE_BRAND } from '@/apollo/client/query';
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";

const AddBrand = ({id}) => {
    const [formData, setFormData] = useState('');
    const [submitType,setSubmitType]=useState("submit")

    const { data, error, loading, refetch } = useQuery(GET_BRAND_BY_ID, {
        variables: { id:id },
    });
    const [addBrand] = useMutation(ADD_BRAND);
    const [UpdateBrand]=useMutation(UPDATE_BRAND)
const router=useRouter()

    useEffect(() => {       
        if (data && data.getBrandById) {
            setFormData(data.getBrandById.name);
            setSubmitType("edit")
        }
    }, [data]);
   
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData) {
            toast.error('Brand Name is required.');
            return;
        }
        if(submitType==="submit"){
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
        }else if(submitType==="edit"){
            try{
                UpdateBrand({
                    variables:{
                            id:id,name:formData
                     
                    }
                }).then((res) => {
                    console.log("🚀 ~ handleSubmit ~ res:", res)
                    router.push("/admin/brands")
                    setSubmitType("submit")
                }).catch((err) => {
                    alert(err.message)
                    toast.error(err.message)
                    console.log("🚀 ~ handleSubmit ~ err:", err)
                  
                })
            }catch(err){

            }
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
                            // value={formData.name}    
                        />

                        <button
                            type="submit"
                            className="flex w-1/3 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                        >
                          {id? "Edit Brand":"Add Brand"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBrand;