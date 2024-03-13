import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <nav class="bg-blue-500 p-4">
            <div class="container mx-auto flex items-center justify-between">
                <div class="text-white text-xl font-bold">
                    YourLogo
                </div>
                <div class="flex space-x-4">
                    <Link href='/' class="text-white hover:text-gray-300">Home</Link>
                    <Link href='' class="text-white hover:text-gray-300">About</Link>
                    <Link href='/products' class="text-white hover:text-gray-300">Product</Link>
                </div>
                <div>
                    <Link href='/cart' class="text-white hover:text-gray-300">Cart</Link>
                    <Link href='' class="text-white hover:text-gray-300">Login</Link>
                </div>
            </div>
        </nav>
    )
}

export default Header