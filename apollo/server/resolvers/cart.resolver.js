import { Cart } from "@/lib/models";
import { combineResolvers } from "graphql-resolvers";
import { isAuthenticatedUser } from '@/apollo/server/utils/middleware';

// done
const addToCart = combineResolvers(isAuthenticatedUser, async (_, { input }, { user }) => {
    try {
        const { _id } = user;
        const { pid, color, qty } = input;
        console.log("🚀 ~ addToCart ~ _id:", _id);
        const usersCart = await Cart.findOne({ user: _id });

        if (!usersCart) {
            await Cart.create({
                user: _id,
                products: [input]
            });
            return "Product added successfully";
        } else {
            let isExist = false;
            for (let i = 0; i < usersCart.products.length; i++) {
                const product = usersCart.products[i];
                if (product.pid.toString() === pid.toString() && product.color.toString() === color.toString()) {
                    usersCart.products[i].qty += qty;
                    isExist = true;
                    await usersCart.save();
                    return "Product updated successfully";
                }
            }
            if (!isExist) {
                usersCart.products.push(input);
                await usersCart.save();
            }
            return "Product added successfully";
        }
    } catch (error) {
        console.error("Error adding product to cart:", error.message);
        return new Error("Failed to add product to cart");
    }
});

// done
const increaseQty = combineResolvers(isAuthenticatedUser, async (_, args, { user }) => {
    try {
        const { _id } = user
        const { _id: itemId } = args
        const cart = await Cart.findOneAndUpdate(
            {
                user: _id,
                "products._id": itemId
            },
            { $inc: { "products.$.qty": 1 } },
        )
        console.log("🚀 ~ increaseQty ~ cart:", cart)
        return "product quantity increased successfully";
    } catch (error) {
        console.error("Error increasing product quantity:", error.message);
        throw new Error("Failed to increase product quantity");
    }
})

// done
const decreaseQty = combineResolvers(isAuthenticatedUser, async (_, args, { user }) => {
    try {
        const { _id } = user
        const { _id: itemId } = args
        const cart = await Cart.findOne(
            {
                user: _id,
                "products._id": itemId
            }
        )
        console.log("🚀 ~ decreaseQty dfbsdfbfgdb ~ cart:", cart)

        const index = cart.products.findIndex(product => product._id.toString() === itemId.toString());
        if (index !== -1 && cart.products[index].qty >= 2) {
            cart.products[index].qty -= 1;
            await cart.save();
            return "product quantity decreased successfully";
        } else {
            return new Error("product quantity cannot be decreased");
        }
    } catch (error) {
        console.error("Error decreased product quantity:", error.message);
        throw new Error("Failed to decreased product quantity");
    }
})

// done
const removeFromCart = combineResolvers(isAuthenticatedUser, async (_, args, { user }) => {
    try {
        const { _id } = user
        const { _id: itemId } = args
        const cart = await Cart.findOneAndUpdate(
            {
                user: _id,
                "products._id": itemId
            },
            { $pull: { products: { _id: itemId } } },
        )
        if (!cart) return new Error("Product not found in cart");
        return "product removed successfully";
    } catch (error) {
        console.error("Error removing product from cart:", error.message);
        throw new Error("Failed to remove product from cart");
    }
})

// done
const clearCart = combineResolvers(isAuthenticatedUser, async (_, args, { user }) => {
    try {
        const { _id } = user
        const cart = await Cart.findOneAndUpdate({ user: _id }, { $set: { products: [] } })
        if (!cart.products.length) return new Error("Cart not found");
        return "cart cleared successfully";
    } catch (error) {
        console.error("Error clearing cart:", error.message);
        return new Error("Failed to clear cart");
    }
})

// done
const getCart = combineResolvers(isAuthenticatedUser, async (_, args, { user }) => {
    try {
        const { _id } = user
        const cart = await Cart.findOne({ user: _id })
            .populate('products.pid')
            .populate('products.color')

        
        console.log("🚀 ~ getCart ~ cart:", cart)
        return cart;
    } catch (error) {
        console.error("Error fetching cart:", error.message);
        throw new Error("Failed to fetch cart.");
    }
})

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
