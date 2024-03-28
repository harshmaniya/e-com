import { Wishlist } from "@/lib/models";
import { combineResolvers } from "graphql-resolvers";
import { isAuthenticatedUser } from '@/apollo/server/utils/middleware';

// done
const addToWishlist = combineResolvers(isAuthenticatedUser, async (_, { productId }, { user }) => {
    try {
        const { _id } = user
        const isExist = await Wishlist.findOne({ user: _id, products: { $in: [productId] } });
        console.log("🚀 ~ addToWishlist ~ isExist:", isExist)
        let wishlist
        if (isExist) {
            wishlist = await Wishlist.findOneAndUpdate(
                { user: _id },
                { $pull: { products: productId } },
                { new: true }
            )
            if (!wishlist) return new Error("something went wrong!");
            return "product removed from wishlist";
        } else {
            wishlist = await Wishlist.findOneAndUpdate(
                { user: _id },
                { $addToSet: { products: productId } },
                { new: true, upsert: true }
            )
            if (!wishlist) return new Error("something went wrong!");
            return "product added to wishlist";
        }
    } catch (error) {
        console.error("Error adding product to wishlist:", error.message);
        throw new Error("Failed to add product to wishlist");
    }
});

// done
const getWishlist = combineResolvers(isAuthenticatedUser, async (_, args, { user }) => {
    try {
        const { _id } = user;
        const wishlist = await Wishlist.findOne({ user: _id }).populate("products")
        if (!wishlist) return new Error("Wishlist not found");
        return wishlist;
    } catch (error) {
        console.error("Error fetching wishlist:", error.message);
        throw new Error("Failed to fetch wishlist");
    }
});

// done
const getWishlistArray = combineResolvers(isAuthenticatedUser, async (_, args, { user }) => {
    try {
        const { _id } = user;
        const wishlist = await Wishlist.findOne({ user: _id })
        if (!wishlist) return new Error("Wishlist not found");
        return wishlist;
    } catch (error) {
        console.error("Error fetching wishlist:", error.message);
        throw new Error("Failed to fetch wishlist");
    }
});

// done - non usable
const removeFromWishlist = combineResolvers(isAuthenticatedUser, async (_, { productId }, { user }) => {
    try {
        const wishlist = await Wishlist.findOneAndUpdate(
            { user: user._id },
            { $pull: { products: productId } },
            { new: true }
        );
        if (!wishlist) return new Error("Wishlist not found");
        return "Product removed from wishlist successfully";
    } catch (error) {
        console.error("Error removing product from wishlist:", error.message);
        throw new Error("Failed to remove product from wishlist");
    }
});


export const wishlistResolver = {
    Query: {
        getWishlist,
        getWishlistArray
    },
    Mutation: {
        addToWishlist,
        removeFromWishlist
    }
};
