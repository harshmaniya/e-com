"use client"

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { LOGIN } from '@/apollo/client/query';
import { toast } from 'react-toastify';

const Login = () => {

    const router = useRouter();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [Login] = useMutation(LOGIN)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        Login({
            variables: {
                input: {
                    ...formData
                }
            }
        }).then(async (res) => {
            localStorage.setItem("accessToken", res.data.login.accessToken)
            toast.success("login successfully");
            router.push('/')
        }).catch((err) => {
            toast.error(err.message)
        })
    };
    return (
        <div className="container h-screen flex justify-center items-center  mx-auto">
            <div className="w-1/3 p-6 px-10 text-[#ab7a5f] rounded-lg shadow-2xl bg-white">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form id="registerForm" className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={handleInputChange}
                            className="mt-1 block w-full focus:outline-none border border-gray-300 px-2 py-2 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleInputChange}
                            className="mt-1 block w-full focus:outline-none border border-gray-300 px-2 py-2 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full mt-5 bg-black text-white py-2 px-4 rounded-md hover:bg-[#ab7a5f] focus:outline-none focus:ring-2 focus:ring-[#ab7a5f] transition-all focus:ring-opacity-50"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default Login;