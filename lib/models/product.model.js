import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        default: 0
    },   
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    sku: {
        type: String
    },
    colors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Color'
    }],
    images: [{
        type: String,
        required: true,
    }],
    freeShipping: {
        type: Boolean,
        default: false
    }
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)

export default Product;