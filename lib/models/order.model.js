import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    products: [{
        pid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        qty: {
            type: Number,
            required: true
        },
        color: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Color"
        }
    }],
    order_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    shipping_address: {
        type: String,
        required: true
    },
    payment_method: {
        type: String,
        required: true
    },
    payment_status: {
        type: String,
        enum: ['paid', 'pending', 'failed'],
        default: 'pending'
    },
    total: {
        type: Number,
        required: true
    }
},
    {
        timestamps: true
    });

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema)
export default Order