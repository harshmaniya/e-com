'use client'

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COLOR } from '@/apollo/client/query';
import { toast } from 'react-toastify';
import ColorPicker from '../FormElements/colorPicker';

const AddColors = () => {

    const [AddColor] = useMutation(ADD_COLOR);
    const [colors, setColors] = useState([]);
    console.log("🚀 ~ AddColors ~ colors:", colors)   

    const handleAddColors = async () => {
        await AddColor({
            variables: {
                input: colors
            }
        }).then(() => {
            toast.success("Color Added Successfully");
            setColors([]);
        }).catch(() => {
            toast.error("Something went wrong");
        })
    };

    return (
        <>
            <ColorPicker colors={colors} setColors={setColors} handleAddColors={handleAddColors} />
        </>
    )
}

export default AddColors