'use client';

import React from 'react'

const TextArea = ({ className, label, type, placeholder, required, ...rest }) => {
    return (
        <>
            <div className={className}>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    {label} {required && <span className="text-meta-1">*</span>}
                </label>
                <textarea
                    rows={6}
                    placeholder={placeholder}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    {...rest}
                ></textarea>
            </div>
        </>
    )
}

export default TextArea

