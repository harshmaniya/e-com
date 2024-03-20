'use client'

import React, { useEffect, useState } from 'react';
import Button from '@/src/components/Client/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { GET_CART } from '@/apollo/client/query';
import { useQuery } from '@apollo/client';


const Cart = () => {

    const router = useRouter()

    const [qty, setQty] = useState()
    const [total, setTotal] = useState(0)

    const { data: cartData, loading, error } = useQuery(GET_CART)
    console.log("🚀 ~ Cart ~ cartData:", cartData)

    const handleRemoveItem = (id, colorID) => {
        console.log("🚀 ~ handleRemoveItem ~ colorID:", colorID)
        console.log("🚀 ~ handleRemoveItem ~ id:", id)
        if (id) {
            const itemData = cartData.filter(
                (item) => item.id !== id || item.color._id !== colorID
            )
            localStorage.setItem('cartData', JSON.stringify(itemData))
            setCartData(itemData)
            console.log("🚀 ~ handleRemoveItem ~ itemData:", itemData)
        }
    }

    const handleIncreaseQty = (id) => {
        if (id) {
            const itemIndex = cartData.findIndex(
                (item) => item.id === id
            )

            const tempCart = JSON.parse(localStorage.getItem('cartData')) || []
            setQty(tempCart[itemIndex].qty += 1)
            console.log("🚀 ~ handleIncreaseQty ~ tempCart:", tempCart)

            localStorage.setItem('cartData', JSON.stringify(tempCart))
            setCartData(tempCart)
        }
    }

    const handleDecreaseQty = (id) => {
        if (id) {
            const itemIndex = cartData.findIndex(
                (item) => item.id === id
            )

            const tempCart = JSON.parse(localStorage.getItem('cartData')) || []
            setQty(tempCart[itemIndex].qty = tempCart[itemIndex].qty > 1 ? tempCart[itemIndex].qty - 1 : 1)
            localStorage.setItem('cartData', JSON.stringify(tempCart))
            setCartData(tempCart)
        }
    }

    const handleClearCart = () => {
        localStorage.clear('cartData')
        setCartData([])
    }

    return (
        <div className="container mx-auto my-8 p-4">
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
                        {
                            cartData ?
                                cartData.getCart.products.map((item) => (

                                    <tr className="hover:bg-gray-100 border-b border-gray-600 transition duration-300 text-center">
                                        <td className="py-4 px-6 flex items-center justify-center">
                                            <span className='flex justify-start'>
                                                <Image src={item.pid.images[0]} alt='' width={100} height={100} />
                                            </span>
                                            <span className='flex flex-col pl-4 text-left'>
                                                <span className='font-bold'>{item.pid.name}</span>
                                                <span className='flex items-center'>
                                                    Color:
                                                    <span style={{
                                                        marginLeft: '5px',
                                                        width: '15px',
                                                        height: '15px',
                                                        backgroundColor: item.color.hexCode,
                                                        borderRadius: '50%',
                                                        display: 'inline-block',
                                                    }}></span>
                                                </span>
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">${item.pid.price}</td>

                                        <td className="py-4 px-6 flex flex-row justify-center">
                                            <p className='flex font-bold text-4xl space-x-8 py-4'>
                                                <button onClick={() => handleDecreaseQty(item._id)}>-</button>
                                                <span>{item.qty}</span>
                                                <button onClick={() => handleIncreaseQty(item._id)}>+</button>
                                            </p>
                                        </td>

                                        <td className="py-4 px-6">{item.pid.price * item.qty}</td>
                                        <td className="py-4 px-6">
                                            <button onClick={() => handleRemoveItem(item.id, item.color._id)} className="text-red-500 hover:text-red-700">Remove</button>
                                        </td>
                                    </tr>
                                ))
                                :
                                <h1>loading...</h1>
                        }
                    </tbody>
                </table>

                <div className='flex justify-between px-4'>
                    <Button className={"mt-10"} onClick={() => router.push('/products')} title={"Continue Shopping"} />
                    <Button className={"mt-10 bg-black"} onClick={() => handleClearCart()} title={"Clear Shopping Cart"} />
                </div>

                <div className="mt-8 flex justify-end">
                    <div className="bg-gray-100 p-6 rounded-lg">
                        <p className="text-xl font-semibold mb-4">
                            Total: {cartData ? cartData.getCart.total : <h1>loading...</h1>}
                        </p>
                        <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
