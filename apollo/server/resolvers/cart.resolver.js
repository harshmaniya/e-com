import { Cart } from "@/lib/models";

const getCartByUserId = async (_, { userId }) => {
    try {
        const cart = await Cart.findOne({ user: userId }).populate({
            path: "products.pid",
            populate: { path: "color" }
        }).populate("user");
        return cart;
    } catch (error) {
        console.error("Error fetching cart:", error);
        throw new Error("Failed to fetch cart");
    }
};

const addToCart = async (_, { userId, product }) => {
    try {
        // Check if the product with the same ID and color exists in the cart
        const isUsersCartExist = await Cart.findOne({ user: userId });
        if (!isUsersCartExist) {
            await Cart.create(
                {
                    user: userId,
                    products: product
                })
            return "product added successfully";
        }

        const existingCart = await Cart.findOneAndUpdate(
            { user: userId },
            {
                $push: { products: product }
            }
        )

        if (existingCart) return "product added successfully";

    } catch (error) {
        console.error("Error adding product to cart:", error.message);
        throw new Error("Failed to add product to cart");
    }
};

const removeFromCart = async (_, { userId, productId, colorId }) => {
    try {

        const cart = await Cart.findOneAndUpdate(
            {
                user: userId,
                "products.pid": productId,
                "products.color": colorId
            },
            { $pull: { products: { pid: productId, color: colorId } } },
        )
        return "product removed successfully";

    } catch (error) {
        console.error("Error removing product from cart:", error);
        throw new Error("Failed to remove product from cart");
    }

};


export const cartResolver = {
    Query: {
        getCartByUserId
    },
    Mutation: {
        addToCart,
        removeFromCart
    }
};
