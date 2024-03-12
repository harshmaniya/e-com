import Image from 'next/image';
import React from 'react';

const Cart = () => {
    return (
        <div className="container mx-auto my-8">
            <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-6 text-center">Item</th>
                            <th className="py-3 px-6 text-center">Price</th>
                            <th className="py-3 px-6 text-center">Quantity</th>
                            <th className="py-3 px-6 text-center">Subtotal</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="hover:bg-gray-100 border-b border-gray-600 transition duration-300 text-center">
                            <td className="py-4 px-6 flex items-center justify-center">
                                <Image src="https://www.course-api.com/images/store/product-16.jpeg" alt='' width={100} height={100} />
                                <div className='flex flex-col pl-4 text-left'>
                                    <span className='font-bold'>Modern Poster</span>
                                    <span>Color : </span>
                                </div>
                            </td>
                            <td className="py-4 px-6">$20.00</td>
                            <td className="py-4 px-6">2</td>
                            <td className="py-4 px-6">$40.00</td>
                            <td className="py-4 px-6">
                                <button className="text-red-500 hover:text-red-700">Remove</button>
                            </td>
                        </tr>
                        {/* Add more rows as needed */}
                    </tbody>
                </table>
            </div>
            <div className="mt-8 flex justify-end">
                <div className="bg-gray-100 p-6 rounded-lg">
                    <p className="text-xl font-semibold mb-4">Total: $80.00</p>
                    <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
