import { Cart } from "@/lib/models";


const addToCart = async (_, { input }, { user }) => {
    try {
        const { _id } = user
        const { product } = input
        const isUsersCartExist = await Cart.findOne({ user: _id });
        if (!isUsersCartExist) {
            await Cart.create(
                {
                    user: _id,
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
        return new Error("Failed to add product to cart");
    }
}

const increaseQty = async (_, { input }, { user }) => {
    try {
        const { _id } = user
        const { productId, colorId } = input
        const cart = await Cart.findOneAndUpdate(
            {
                user: _id,
                "products.pid": productId,
                "products.color": colorId
            },
            { $inc: { "products.$.qty": 1 } },
        )
        return "product quantity increased successfully";
    } catch (error) {
        console.error("Error increasing product quantity:", error.message);
        throw new Error("Failed to increase product quantity");
    }
}

const decreaseQty = async (_, { input }, { user }) => {
    try {
        const { _id } = user
        const { productId, colorId } = input
        const cart = await Cart.findOneAndUpdate(
            {
                user: _id,
                "products.pid": productId,
                "products.color": colorId
            },
            { $dec: { "products.$.qty": 1 } },
        )
        return "product quantity increased successfully";
    } catch (error) {
        console.error("Error increasing product quantity:", error.message);
        throw new Error("Failed to increase product quantity");
    }
}

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

}

const clearCart = async (_, args, { user }) => {
    try {
        const { _id } = user
        const cart = await Cart.findOneAndUpdate({ user: _id }, { $set: { products: [] } })
        if(cart) return "cart cleared successfully";
    } catch (error) {
        console.error("Error clearing cart:", error.message);
        throw new Error("Failed to clear cart");
    }
}

const getCart = async (_, args, { user }) => {
    try {
        const { _id } = user
        const cart = await Cart.findOne({ user: _id })
            .populate({ path: 'products.pid', select: "_id name price" })
            .populate({ path: 'products.color', select: "_id name hexCode" })

        return cart;
    } catch (error) {
        console.error("Error fetching cart:", error);
        throw new Error("Failed to fetch cart.");
    }
}

export const cartResolver = {
    Query: {
        getCart
    },
    Mutation: {
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart
    }
};
