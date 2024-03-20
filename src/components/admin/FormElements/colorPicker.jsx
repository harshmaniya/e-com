'use client';

import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import Input from './input';

const ColorPicker = ({ colors, setColors }) => {
    const [currantColor, setCurrantColor] = useState('#000000');

    const handleCurrantColor = (newColor) => {
        setCurrantColor(newColor.hex);
    };

    const addColor = () => {
        setColors([...colors, currantColor]);
    }

    return (
        <>
            <div className="mb-6 col-span-5 xl:col-span-2">
                <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Select Product's Colors
                        </h3>
                    </div>
                    <div className="p-7">
                        <div className='flex justify-between'>
                            <div>
                                <ChromePicker color={currantColor} onChange={(newColor) => handleCurrantColor(newColor)} />
                                <button onClick={addColor} className="flex w-36 mt-6 my-3 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                    Add
                                </button>
                            </div>
                            <div className='p-5 grid grid-cols-3 gap-3'>
                                {colors.map((color, index) => (
                                    <div key={index} className="px-3">
                                        <div className="">
                                            <div className="w-10 h-10 relative bg-white rounded-full p-2"
                                            style={{ backgroundColor: color }}>
                                            <svg className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black opacity-0 transition-all duration-200 ease-in-out hover:cursor-pointer hover:opacity-100" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M14.95 5.05a1 1 0 0 0-1.41 0L10 8.59l-3.54-3.54a1 1 0 1 0-1.41 1.41L8.59 10l-3.54 3.54a1 1 0 0 0 1.41 1.41L10 11.41l3.54 3.54a1 1 0 0 0 1.41-1.41L11.41 10l3.54-3.54a1 1 0 0 0 0-1.41z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            
                                        </div>

                                        <Input
                                            className={"w-[200px]"}
                                            label={""}
                                            type={"text"}
                                            placeholder={"color name"}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-end gap-4.5">
                            <button
                                className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                type="submit"
                            >
                                Cancel
                            </button>
                            <button
                                className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                                type="submit"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ColorPicker;

