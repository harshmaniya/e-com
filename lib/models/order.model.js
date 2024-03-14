import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    total: {
        type: Number,
        required: true
    }
});

const Order = mongoose.models.Order || mongoose.model("Role", OrderSchema)
export default Order