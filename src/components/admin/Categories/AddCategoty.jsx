'use client'

import React, { useState ,useEffect} from 'react';
// import { useForm } from "react-hook-form"
import Input from '../FormElements/input';
import { useMutation,useQuery } from '@apollo/client';
import { ADD_CATEGORY,GET_CATEGORY_BY_ID,UPDATE_CATEGORY } from '@/apollo/client/query';
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";

const AddCategory = ({id}) => {

    const [formData, setFormData] = useState('');
    const [submitType,setSubmitType]=useState("submit")
    console.log("🚀 ~ AddCategory ~ submitType:", submitType)

    const {data,error,loading,refetch}=useQuery(GET_CATEGORY_BY_ID,{
        variables:{
            id
        }
    })
    const router=useRouter()
    const [AddCategory] = useMutation(ADD_CATEGORY);
    const [UpdateCategory] = useMutation(UPDATE_CATEGORY);

    useEffect(() => {
        // Check if data is not null and getBrandById is not null
        if (data && data.getCategoryById) {
            setFormData(data.getCategoryById.name);
            setSubmitType("edit")
        }
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData) {
            toast.error('Category Name is required.');
            return;
        }
       if(submitType==="submit"){
        try {
            await AddCategory({
                variables: {
                    name: formData,
                },
            });
            toast.success('Category Added successfully');
            // Reset form after successful submission if needed
            setFormData('');
        } catch (err) {
            toast.error(err.message);
        }
       }else if(submitType==="edit"){
        UpdateCategory({
            variables:{
                id,name:formData
            }
        }).then((res) => {
            console.log("🚀 ~ handleSubmit ~ res:", res)
            setSubmitType("submit")
            router.push("/admin/categories")
        
        }).catch((err)=>{
            alert(err.message)
        })
       }
    };

    return (
        <>
            <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Create New Category
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit} >
                        <div className="p-6.5">
                            <Input
                                className={"w-full mb-6"}
                                label={"Category Name"}
                                type={"text"}
                                id="name"
                                name="name"
                                value={formData}
                                placeholder={"Enter Category name"}
                                onChange={(e)=>setFormData(e.target.value)}
                                // required={true}
                                // {...register("category", { required: true })}
                                // errors={errors.category}
                            />

                            <button type="submit" className="flex w-1/3 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                             { submitType==="edit"?"Edit Category":"  Add Category"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddCategory