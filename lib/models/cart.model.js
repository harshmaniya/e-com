import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    products: [{
        pid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        qty: {
            type: Number,
            min: 1,
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
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

CartSchema.virtual('total').get(function () {
    let total = 0;
    this.products.forEach(product => {
        total += product.qty * product.pid.price;
        console.log("🚀 ~ product.pid.price:", product.pid.price)
        console.log("🚀 ~ product.pid.price typeof:", typeof product.pid.price)
    });
    return total;
});


const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);
export default Cart;
