import { combineResolvers } from "graphql-resolvers";
import { isAuthenticatedUser, isAuthenticatedAdmin } from '@/apollo/server/utils/middleware';
import { Cart, Order } from "@/lib/models";

// done
const createOrder = combineResolvers(isAuthenticatedUser, async (_, { input }, { user }) => {
    try {
        const { shipping_address, payment_status } = input
        console.log("🚀 ~ createOrder ~ shipping_address:", shipping_address)

        const { _id } = user
        const cart = await Cart.findOne({ user: _id })
            .populate('products.pid')
        console.log("total ------------", cart.total);
        const newOrder = await Order.create({
            user: _id,
            products: cart.products,
            shipping_address: shipping_address,
            payment_method: "COD",
            payment_status,
            total: cart.total
        });
        if (!newOrder) return new Error("Failed to create order");
        return "Order created successfully";
    } catch (error) {
        console.error("Error creating order:", error.message);
        return new Error("Failed to create order: " + error.message);
    }
});

// done
const getOrder = combineResolvers(isAuthenticatedUser, async (_, args, { user }) => {
    try {
        const { _id } = user
        const { orderId } = args
        const order = await Order.findOne({ user: _id, _id: orderId })
            .populate({ path: "products", populate: [{ path: "pid color" }] })
        if (!order) return new Error("Order not found");
        return order;
    } catch (error) {
        console.error("Error fetching order:", error.message);
        throw new Error("Failed to fetch order");
    }
});

// done
const getAllOrders = combineResolvers(isAuthenticatedAdmin, async (_, args) => {
    try {

        const orders = await Order.find({})
            .populate({ path: "products", populate: [{ path: "pid color" }] })
        if (!orders) return new Error("Order not found");
        return orders;
    } catch (error) {
        console.error("Error fetching all orders:", error.message);
        throw new Error("Failed to fetch orders");
    }
});

// done
const getAllOrdersByUser = combineResolvers(isAuthenticatedUser, async (_, args, { user }) => {
    try {
        const orders = await Order.find({ user: user._id })
            .populate({ path: "products", populate: [{ path: "pid color" }] })
        if (!orders) return new Error("Order not found");
        return orders;
    } catch (error) {
        console.error("Error fetching all orders:", error.message);
        return new Error("Failed to fetch orders");
    }
})

export const orderResolvers = {
    Query: {
        getOrder,
        getAllOrders,
        getAllOrdersByUser
    },
    Mutation: {
        createOrder
    }
};