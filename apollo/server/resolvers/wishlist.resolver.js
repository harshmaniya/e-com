import { Wishlist } from "@/lib/models";

const getWishlist = async (_, { userId }) => {
    try {
        const wishlist = await Wishlist.findOne({ user: userId }).populate("products").populate("user");
        return wishlist;
    } catch (error) {
        console.error("Error fetching wishlist:", error);
        throw new Error("Failed to fetch wishlist");
    }
};

const addToWishlist = async (_, { userId, productId }) => {
    try {
        // Logic to add product to the wishlist
        const wishlist = await Wishlist.findOneAndUpdate(
            { user: userId },
            { $addToSet: { products: productId } },
            { new: true, upsert: true }
        ).populate("products").populate("user");

        return wishlist;
    } catch (error) {
        console.error("Error adding product to wishlist:", error);
        throw new Error("Failed to add product to wishlist");
    }
};

const removeFromWishlist = async (_, { userId, productId }) => {
    try {
        // Logic to remove product from the wishlist
        const wishlist = await Wishlist.findOneAndUpdate(
            { user: userId },
            { $pull: { products: productId } },
            { new: true }
        ).populate("products").populate("user");
        return wishlist;
    } catch (error) {
        console.error("Error removing product from wishlist:", error);
        throw new Error("Failed to remove product from wishlist");
    }
};

export const wishlistResolver = {
    Query: {
        getWishlist
    },
    Mutation: {
        addToWishlist,
        removeFromWishlist
    }
};
