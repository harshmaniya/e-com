'use client';

import { GET_ALL_ORDERS } from "@/apollo/client/query";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

// let data = {};
// data.getAllOrders = [
//     {
//         order_id: "#123456",
//         name: "Free package",
//         address: "123 Main St, Anytown USA",
//         date: `Jan 13,2023`,
//         price: 0.0,
//         status: "Paid",
//     },
//     {
//         order_id: "#123456",
//         name: "Standard Package",
//         address: "123 Main St, Anytown USA",
//         date: `Jan 13,2023`,
//         price: 59.0,
//         status: "Paid",
//     },
//     {
//         order_id: "#123456",
//         name: "Business Package",
//         address: "123 Main St, Anytown USA",
//         date: `Jan 13,2023`,
//         price: 99.0,
//         status: "Unpaid",
//     },
//     {
//         order_id: "#123456",
//         name: "Standard Package",
//         address: "123 Main St, Anytown USA",
//         date: `Jan 13,2023`,
//         price: 59.0,
//         status: "Pending",
//     },
//     {
//         order_id: "#123456",
//         name: "Business Package",
//         address: "123 Main St, Anytown USA",
//         date: `Jan 13,2023`,
//         price: 99.0,
//         status: "success",
//     }
// ];

const Orders = () => {

    const router = useRouter();
    const [selectedItem, setSelectedItem] = useState(null);

    const { data, loading, error } = useQuery(GET_ALL_ORDERS);
    console.log("🚀 ~ Orders ~ data:", data)


    const handleItemClick = (id) => {
        setSelectedItem(id === selectedItem ? null : id);
    };

    // TODO: Add status color
    // ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'paid':
                return 'bg-blue-200 text-blue-600 dark:bg-green-600';
            case 'unpaid':
                return 'bg-rose-200 text-rose-600 dark:bg-rose-600';
            case 'pending':
                return 'bg-orange-200 text-orange-600 dark:bg-orange-600';
            case 'success':
                return 'bg-green-200 text-green-600 dark:bg-blue-600';
            default:
                return '';
        }
    };



    return (
        <div className="dark:bg-boxdark">


            <div class="rounded-sm border border-stroke bg-white p-6 py-4 shadow-default dark:border-strokedark dark:bg-boxdark ">
                <ul className="flex space-x-4">
                    <li
                        className={`nav-item hover:cursor-pointer ${selectedItem === 'allOrders' && 'text-blue-500 border-b-2'}`}
                        onClick={() => handleItemClick('allOrders')}
                    >
                        All orders
                    </li>
                    <li
                        className={`nav-item hover:cursor-pointer ${selectedItem === 'completed' && 'text-blue-500 border-b-2'}`}
                        onClick={() => handleItemClick('completed')}
                    >
                        Completed
                    </li>
                    <li
                        className={`nav-item hover:cursor-pointer ${selectedItem === 'pending' && 'text-blue-500 border-b-2'}`}
                        onClick={() => handleItemClick('pending')}
                    >
                        Pending
                    </li>
                    <li
                        className={`nav-item hover:cursor-pointer ${selectedItem === 'cancel' && 'text-blue-500 border-b-2'}`}
                        onClick={() => handleItemClick('cancel')}
                    >
                        Cancel
                    </li>
                </ul>
            </div>

            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto text-center">
                        <thead>
                            <tr className="bg-gray-2  dark:bg-meta-4">
                                <th className="min-w-[80px] px-4 py-4 font-medium text-black dark:text-white">
                                    #
                                </th>
                                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                                    Order ID
                                </th>
                                <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white ">
                                    Customer Name
                                </th>
                                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                    Address
                                </th>
                                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                                    Date
                                </th>
                                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                                    Price
                                </th>
                                <th className="px-4 py-4 font-medium text-black dark:text-white">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.getAllOrders?.map((item, index) => (
                                <tr className="text-center" key={index}>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark ">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {index + 1}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark ">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {/* {item.order_id} */}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark ">
                                        <h5 className="font-medium text-black dark:text-white">                                            
                                        </h5>
                                        {/* <p className="text-sm">${item.customer_name}</p> */}
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark ">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {/* {item.shipping_address} */}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {item.order_date}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            ${item.total}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee]  dark:border-strokedark ">
                                        <p className={`px-4 py-2 rounded-full dark:text-white ${getStatusColor(item.status)}`}>
                                            {item.status}
                                        </p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Orders;
