'use client';

import { useQuery } from '@apollo/client';
import React, { useEffect, useState, useCallback } from 'react';
import { GET_ALL_CATEGORY, GET_ALL_BRANDS, GET_ALL_COLORS, GET_ALL_CATEGORIES } from '@/apollo/client/query';

const SideBar = () => {
    const { data: categoryData } = useQuery(GET_ALL_CATEGORIES);
    const { data: brandData } = useQuery(GET_ALL_BRANDS);
    const { data: colorsData } = useQuery(GET_ALL_COLORS);

    const [selectedCategories, setSelectedCategories] = useState({});
    const [selectedBrand, setSelectedBrand] = useState({});
    const [selectedColors, setSelectedColors] = useState([]);

    const [isFreeShippingSelected, setFreeShippingSelected] = useState(false);

    const handleFreeShippingSelection = () => {
        setFreeShippingSelected((prev) => !prev);
    };

    const handleColor = useCallback((index) => {
        setSelectedColors((prev) => {
            const updatedColors = [...prev];
            updatedColors[index] = {
                ...updatedColors[index],
                isSelected: !updatedColors[index].isSelected,
                color: 'maroon',
            };
            return updatedColors;
        });
    }, []);

    const handleCategorySelection = (categoryId) => {
        setSelectedCategories((prev) => {
            const updatedCategories = { ...prev };
            updatedCategories[categoryId] = !prev[categoryId];
            return updatedCategories;
        });
    };

    const handleBrandSelection = (brandId) => {
        setSelectedBrand((prev) => {
            const updatedBrand = { ...prev };
            updatedBrand[brandId] = !prev[brandId];
            return updatedBrand;
        });
    };

    const [colorsDataTemp, setColorsDataTemp] = useState({});
    console.log("🚀 ~ SideBar ~ colorsDataTemp:", colorsDataTemp)

    useEffect(() => {
        if (colorsData) {
            setColorsDataTemp(colorsData);
        }
    }, [colorsData]);

    return (
        <div>
            <input type="text" className="border rounded py-2 px-3 bg-slate-300" />

            {categoryData ? (
                <>
                    <p className="text-xl font-bold mt-4">Category</p>
                    {categoryData?.getAllCategories?.map((cdata) => (
                        <div key={cdata.id}>
                            <input
                                type="checkbox"
                                id={`category-${cdata.id}`}
                                onChange={() => handleCategorySelection(cdata.id)}
                                checked={selectedCategories[cdata.id] || false}
                            />
                            <label htmlFor={`category-${cdata.id}`} className="ml-2">
                                {cdata.name}
                            </label>
                        </div>
                    ))}
                </>
            ) : (
                <h1>Loading categories...</h1>
            )}

            {brandData ? (
                <>
                    <p className="text-xl font-bold mt-4">Brand</p>
                    {brandData?.getAllBrands?.map((bdata) => (
                        <div key={bdata.id}>
                            <input
                                type="checkbox"
                                id={`brand-${bdata.id}`}
                                onChange={() => handleBrandSelection(bdata.id)}
                                checked={selectedBrand[bdata.id] || false}
                            />
                            <label htmlFor={`brand-${bdata.id}`} className="ml-2">
                                {bdata.name}
                            </label>
                        </div>
                    ))}
                </>
            ) : (
                <h1>Loading brands...</h1>
            )}

            {colorsDataTemp && colorsDataTemp.length ? (
                <h1>Loading colors...</h1>
            ) : (
                <>
                    <p className="text-xl font-bold mt-4">Colors</p>
                    <div className="flex gap-2">
                        {colorsDataTemp?.getAllColors?.map((color, index) => (
                            <div
                                key={index}
                                onClick={() => handleColor(index)}
                                className={`relative inline-block w-5 h-5 bg-[${color.hexCode}] rounded-full p-1 cursor-pointer`}
                            >
                                {color.isSelected && (
                                    <>
                                        <div className="absolute inset-0 ring-2 ring-red-900 rounded-full"></div>
                                        <svg
                                            className="text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            style={{ width: '60%', height: '60%' }}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* <p className="text-xl font-bold mt-4">Free Shipping</p> */}
            <div>
                <label htmlFor="free-shipping" className="mr-2 text-xl font-bold mt-4">
                    Free Shipping
                </label>
                <input
                    type="checkbox"
                    id="free-shipping"
                    onChange={handleFreeShippingSelection}
                    checked={isFreeShippingSelected}
                />

            </div>
        </div>

    );
};

export default SideBar;
