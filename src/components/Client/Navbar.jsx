'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const logo = require('@/public/logo.221f6b13e6eaaad5828372464f73a1a4.svg');

const Navbar = () => {
    const isUserLogin = localStorage.getItem('user');

    const logoutUser = () => {
        localStorage.removeItem('user');
    };

    return (
        <div className="bg-gray-200">
            <nav className="flex justify-between items-center container mx-auto py-4 px-8">
                <div>
                    <Image src={logo} alt="Logo" width={180} />
                </div>
                <ul className='flex text-lg text-black '>
                    <li className="mr-4"><Link href="/">Home</Link></li>
                    <li className="mr-4"><Link href="/about">About</Link></li>
                    <li className="mr-4"><Link href="/products">Product</Link></li>
                </ul>
                <ul className='flex text-2xl font-bold text-black'>
                    <li className="mr-4"><Link href="/cart">Cart</Link></li>
                    {isUserLogin ?
                        <li className="mr-4"><button onClick={logoutUser} className="text-blue-500 hover:text-blue-700">Logout</button></li>
                        :
                        <li className="mr-4"><Link href="/login">Login</Link></li>}
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
