import { Wishlist } from "@/lib/models";


const getWishlist = async (_, args, { user }) => {
    try {
        const { _id } = user;
        const wishlist = await Wishlist.findOne({ user: _id })
            .populate("products")
            .populate("user");

        if (!wishlist) return new Error("Wishlist not found");
        console.log("Fetched wishlist:", wishlist);
        return wishlist;
    } catch (error) {
        console.error("Error fetching wishlist:", error.message);
        throw new Error("Failed to fetch wishlist");
    }
};

const addToWishlist = async (_, { userId, productId }) => {
    try {
        await Wishlist.findOneAndUpdate(
            { user: userId },
            { $addToSet: { products: productId } },
            { new: true, upsert: true }
        )

        return "product added to wishlist successfully";
    } catch (error) {
        console.error("Error adding product to wishlist:", error.message);
        throw new Error("Failed to add product to wishlist");
    }
};

const removeFromWishlist = async (_, { userId, productId }) => {
    try {
        await Wishlist.findOneAndUpdate(
            { user: userId },
            { $pull: { products: productId } },
            { new: true }
        )
        return "product removed from wishlist successfully";
    } catch (error) {
        console.error("Error removing product from wishlist:", error.message);
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
