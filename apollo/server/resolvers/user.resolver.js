import { Role, User } from "@/lib/models";


// done
const createUser = async (_, { input }) => {
    try {
        console.log("🚀 ~ createUser ~ input:", input.email)
        
        const isExistingUser = await User.findOne({ email: input.email });
        if (isExistingUser) {
            return new Error("Email is already in use");
        }

        // input.role = await Role.findOne({ name: "user" }).select("_id");
        const user = await User.create(input);
        if (!user) {
            return new Error("Failed to create user");
        }
        console.log("🚀 ~ createUser ~ user:", user)
        
        return "User created successfully";
    } catch (error) {
        console.error("Failed to create user:", error.message);
        return new Error("Failed to create user. Please try again later.");
    }
};

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

export const userResolver = {
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
