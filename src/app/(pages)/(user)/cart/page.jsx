'use client'

import Button from '@/src/components/Client/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { GET_CART, INCREASE_QTY, DECREASE_QTY, REMOVE_FROM_CART, CLEAR_CART, CREATE_ORDER, CREATE_CHECKOUT_SESSION } from '@/apollo/client/query';
import { useMutation, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { redirectToCheckout } from '@/src/app/api/stripe';


const Cart = () => {

    const router = useRouter()

    const { data: cartData, loading, error, refetch: refetchCart } = useQuery(GET_CART)
    const [IncreaseQty] = useMutation(INCREASE_QTY)
    const [DecreaseQty] = useMutation(DECREASE_QTY)
    const [RemoveFromCart] = useMutation(REMOVE_FROM_CART)
    const [ClearCart] = useMutation(CLEAR_CART)

    // const [CreateOrder] = useMutation(CREATE_ORDER)
    const [CreateCheckoutSession] = useMutation(CREATE_CHECKOUT_SESSION)

    const handleRemoveItem = (id) => {
        if (id) {
            RemoveFromCart({
                variables: {
                    id
                }
            }).then((res) => {
                toast.success(res.data.removeFromCart)
                refetchCart()
            }).catch((err) => {
                toast.error(err.message)
            })
        }
    }

    const handleIncreaseQty = (id) => {
        if (id) {
            IncreaseQty({
                variables: {
                    id
                }
            }).then((res) => {
                toast.success(res.data.increaseQty)
                refetchCart()
            }).catch((err) => {
                toast.error(err.message)
            })
        }
    }

    const handleDecreaseQty = (id) => {
        if (id) {
            DecreaseQty({
                variables: {
                    id
                }
            }).then((res) => {
                toast.success(res.data.decreaseQty)
            }).catch((err) => {
                toast.error(err.message)
            })
        }
    }

    const handleClearCart = () => {
        ClearCart().then((res) => {
            toast.success(res.data.clearCart)
        }).catch((err) => {
            toast.error(err.message)
        })
    }

    const handlePlaceOrder = async () => {

        const createSession = await CreateCheckoutSession()
        console.log("🚀 ~ handlePlaceOrder ~ createSession:", createSession)
        const sessionId = createSession.data.createCheckoutSession.sessionId      
        redirectToCheckout(sessionId)  

        // CreateOrder({
        //     variables: {
        //         input: {
        //             products: cartData.getCart.products
        //         }
        //     }
        // })
        // router.push('/checkout')
    }

    useEffect(() => {
        refetchCart()
    }, [])

    return (
        <>
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
                                                <button onClick={() => handleRemoveItem(item._id)} className="text-red-500 hover:text-red-700">Remove</button>
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

                    <div className='mt-10 mb-5 px-5 ml-auto w-[30%] border border-gray-200 text-center p-2'>
                        <div className='border-b border-b-gray-200 pb-4'>
                            <div className="flex text-start items-center py-2">
                                <p className='text-base font-bold w-1/2  '>SUBTOTAL :</p>
                                <p >{cartData ? `$ ${cartData.getCart.total}` : <h1>loading...</h1>}</p>
                            </div>
                            <div className="flex text-start items-center py-2">
                                <p className='text-base font-bold w-1/2  '>SHIPPING CHARGE :</p>
                                {/* <p >$ {shippingCharge}</p> */}
                            </div>
                        </div>
                        <div className="flex text-start items-center py-2">
                            <p className='text-lg font-bold w-1/2  '>TOTAL AMOUNT :</p>
                            <p >{cartData ? `$ ${cartData.getCart.total}` : <h1>loading...</h1>}</p>
                        </div>


                    </div>
                    <div className="w-[30%] mb-10 ml-auto mt-1">
                        <button onClick={() => handlePlaceOrder()} className='w-full px-4 py-2 text-white bg-[#ab7a5f] rounded-sm'>
                            Place Order
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Cart;
