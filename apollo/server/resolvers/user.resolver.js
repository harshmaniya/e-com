import { User } from "./models";

const getUsers = async () => {
    try {
        const users = await User.find().populate("orders").populate("cart").populate("wishlist");
        if (!users) {
            throw new Error("User not found");
        }
        return users;
    } catch (error) {
        console.error("Failed to fetch users:", error);
        throw new Error("Failed to fetch users. Please try again later.");
    }
};

const getUserById = async (_, { _id }) => {
    try {
        const user = await User.findById(_id).populate("orders").populate("cart").populate("wishlist");
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
        console.error("Failed to fetch user by ID:", error);
        throw new Error("Failed to fetch user. Please try again later.");
    }
};

const createUser = async (_, { input }) => {
    try {
        const existingUser = await User.findOne({ email: input.email });
        if (existingUser) {
            throw new Error("Email is already in use");
        }
        const user = await User.create(input);
        return user;
    } catch (error) {
        console.error("Failed to create user:", error);
        throw new Error("Failed to create user. Please try again later.");
    }
};

const updateUser = async (_, { input }) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(input._id, input, { new: true });
        if (!updatedUser) {
            throw new Error("User not found");
        }
        return updatedUser;
    } catch (error) {
        console.error("Failed to update user:", error);
        throw new Error("Failed to update user. Please try again later.");
    }
};

const deleteUser = async (_, { _id }) => {
    try {
        const deletedUser = await User.findByIdAndDelete(_id);
        if (!deletedUser) {
            throw new Error("User not found");
        }
        return deletedUser;
    } catch (error) {
        console.error("Failed to delete user:", error);
        throw new Error("Failed to delete user. Please try again later.");
    }
};

export const userResolvers = {
    Query: {
        getUsers,
        getUserById
    },
    Mutation: {
        createUser,
        updateUser,
        deleteUser
    }
};
