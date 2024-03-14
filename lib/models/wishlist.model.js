import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const Wishlist = mongoose.models.Wishlist || mongoose.model("Wishlist", WishlistSchema)
export default Wishlist