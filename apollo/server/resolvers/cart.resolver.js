import { Cart } from "./models";

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
        const existingProduct = await Cart.findOne({
            user: userId,
            "products.pid": product.pid,
            "products.color": product.color
        });

        if (existingProduct) {
            // If the product exists, update its quantity
            const cart = await Cart.findOneAndUpdate(
                {
                    user: userId,
                    "products.pid": product.pid,
                    "products.color": product.color
                },
                {
                    $inc: { "products.$.qty": product.qty }
                },
                { new: true }
            );
            return cart;
        } else {
            // If the product doesn't exist, add it to the cart
            const cart = await Cart.findOneAndUpdate(
                { user: userId },
                { $push: { products: product } },
                { new: true, upsert: true }
            );
            return cart;
        }
    } catch (error) {
        console.error("Error adding product to cart:", error);
        throw new Error("Failed to add product to cart");
    }
};

const removeFromCart = async (_, { userId, productId, colorId }) => {
    try {
        // Remove the product with the given ID and color from the cart
        const cart = await Cart.findOneAndUpdate(
            {
                user: userId,
                "products.pid": productId,
                "products.color": colorId
            },
            { $pull: { products: { pid: productId, color: colorId } } },
            { new: true }
        );
        return cart;
    } catch (error) {
        console.error("Error removing product from cart:", error);
        throw new Error("Failed to remove product from cart");
    }
};


export const cartResolvers = {
    Query: {
        getCartByUserId
    },
    Mutation: {
        addToCart,
        removeFromCart
    }
};
