import { Order } from "./models";

const getOrderByUserId = async (_, { userId }) => {
    try {
        const order = await Order.findOne({ user: userId }).populate({
            path: "products.pid",
            populate: { path: "color" }
        }).populate("user");
        return order;
    } catch (error) {
        console.error("Error fetching order:", error);
        throw new Error("Failed to fetch order");
    }
};

const getAllOrders = async () => {
    try {
        const orders = await Order.find().populate({
            path: "products.pid",
            populate: { path: "color" }
        }).populate("user");
        return orders;
    } catch (error) {
        console.error("Error fetching all orders:", error);
        throw new Error("Failed to fetch orders");
    }
};

const createOrder = async (_, { input }) => {
    try {
        const order = await Order.create(input);
        return order;
    } catch (error) {
        console.error("Error creating order:", error);
        throw new Error("Failed to create order");
    }
};

export const orderResolvers = {
    Query: {
        getOrderByUserId,
        getAllOrders
    },
    Mutation: {
        createOrder
    }
};
