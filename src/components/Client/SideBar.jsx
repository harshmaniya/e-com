'use client';

import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { GET_ALL_CATEGORIES, GET_ALL_BRANDS, GET_ALL_COLORS } from '@/apollo/client/query';
import { debounce } from 'lodash';


const SideBar = ({
    selectedCategories,
    setSelectedCategories,
    selectedBrands,
    setSelectedBrands,
    selectedColors,
    setSelectedColors,    
    isFreeShippingSelected,
    setIsFreeShippingSelected,
    search,
    setSearch }) => {

    const { data: categoryData } = useQuery(GET_ALL_CATEGORIES);
    const { data: brandData } = useQuery(GET_ALL_BRANDS);
    const { data: colorsData } = useQuery(GET_ALL_COLORS);


    const debouncedHandleSearch = debounce((value) => {
        setSearch(value);
    }, 1000);

    const handleSearch = (e) => {
        const value = e.target.value;
        debouncedHandleSearch(value);
    }

    const handleFreeShippingSelection = () => {
        setIsFreeShippingSelected((prev) => !prev);
    };

    const handleColorsSelection = (colorId) => {
        setSelectedColors((prev) => {
            const updatedColors = [...prev]
            const index = updatedColors.indexOf(colorId);
            if (index !== -1) {
                updatedColors.splice(index, 1);
            } else {
                updatedColors.push(colorId);
            }
            return updatedColors;
        });
    };

    const handleCategoriesSelection = (categoryId) => {
        setSelectedCategories((prev) => {
            const updatedCategories = [...prev];
            const index = updatedCategories.indexOf(categoryId);
            if (index !== -1) {
                updatedCategories.splice(index, 1);
            } else {
                updatedCategories.push(categoryId);
            }
            return updatedCategories;
        });
    };

    const handleBrandsSelection = (brandId) => {
        setSelectedBrands((prev) => {
            const updatedBrand = [...prev];
            const index = updatedBrand.indexOf(brandId);
            if (index !== -1) {
                updatedBrand.splice(index, 1);
            } else {
                updatedBrand.push(brandId);
            }
            return updatedBrand;
        });
    };


    return (
        <div>
            <input
                type="text"
                placeholder='Search'
                value={search}
                className="border rounded py-2 px-3"
                onChange={(e) => handleSearch(e)} />

            {categoryData ? (
                <>
                    <p className="text-xl font-bold mt-4">Categories</p>
                    {categoryData?.getAllCategories?.map((cdata) => (
                        <div key={cdata._id}>
                            <input
                                type="checkbox"
                                id={`category-${cdata._id}`}
                                onChange={() => handleCategoriesSelection(cdata._id)}
                                checked={selectedCategories.includes(cdata._id) || false}
                            />
                            <label htmlFor={`category-${cdata._id}`} className="ml-2">
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
                    {brandData?.getAllBrands?.map((bdata, index) => (
                        <div key={index}>
                            <input
                                type="checkbox"
                                id={`brand-${bdata._id}`}
                                onChange={() => handleBrandsSelection(bdata._id)}
                                checked={selectedBrands.includes(bdata._id) || false}
                            />
                            <label htmlFor={`brand-${bdata._id}`} className="ml-2">
                                {bdata.name}
                            </label>
                        </div>
                    ))}
                </>
            ) : (
                <h1>Loading brands...</h1>
            )}

            {colorsData ? (
                <>
                    <p className="text-xl font-bold mt-4">Colors</p>
                    <div className="flex gap-2">
                        {colorsData?.getAllColors?.map((color, index) => (
                            <div
                                key={index}
                                onClick={() => handleColorsSelection(color._id)}
                                className="w-5 h-5 relative bg-white rounded-full p-2"
                                style={{ backgroundColor: color.hexCode }}
                            >
                                {selectedColors.includes(color._id) && (
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
            )
                : <h1>loading...</h1>}

            <div className='mt-4'>
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
