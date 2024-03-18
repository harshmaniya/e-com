import { Order } from "./models";


const createOrder = async (_, { input }, { user }) => {
    try {
        input.user = user._id
        const newOrder = await Order.create(input);
        if (newOrder) return newOrder
    } catch (error) {
        console.error("Error creating order:", error.message);
        return new Error("Failed to create order: " + error.message);
    }
};

const getOrderByUserId = async (_, { userId }) => {
    try {
        const order = await Order.findOne({ user: userId })
            .populate({
                path: "products.pid",
                populate: { path: "color" }
            })
            .populate("user");
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

export const orderResolvers = {
    Query: {
        getOrderByUserId,
        getAllOrders
    },
    Mutation: {
        createOrder
    }
};
