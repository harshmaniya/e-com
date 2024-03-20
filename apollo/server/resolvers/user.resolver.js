import { Role, User } from "@/lib/models";

// done
const login = async (_, { input }) => {
    const { email, password } = input;
    try {
        const userData = await User.findOne({ email });
        if (!userData) return new Error("Wrong email or password");
        const isMatch = await userData.isPasswordCorrect(password);
        if (!isMatch) return new Error("Wrong email or password");

        const accessToken = await userData.generateAccessToken();
        userData.accessToken = accessToken;
        return userData;
    } catch (error) {
        console.log(error.message);
        return new Error(error.message);
    };
};

// done
const createUser = async (_, { input }) => {
    try {
        const isExistingUser = await User.findOne({ email: input.email });
        if (isExistingUser) {
            return new Error("Email is already in use");
        }

        input.role = await Role.findOne({ name: "user" }).select("_id");
        const user = await User.create(input);
        if (!user) {
            return new Error("Failed to create user");
        }
        return "User created successfully";
    } catch (error) {
        console.error("Failed to create user:", error.message);
        return new Error("Failed to create user. Please try again later.");
    }
};

// done
const getUserProfile = async (_, args, { user }) => {
    try {
        const userData = await User.findById(user._id)
        if (!userData) {
            return new Error("User not found");
        }
        return userData;
    } catch (error) {
        console.error("Failed to fetch user by ID:", error);
        return new Error("Failed to fetch user. Please try again later.");
    }
};





const getUsers = async () => {
    try {
        const users = await User.find().populate("orders").populate("cart").populate("wishlist");
        if (!users) {
            return new Error("User not found");
        }
        return users;
    } catch (error) {
        console.error("Failed to fetch users:", error);
        return new Error("Failed to fetch users. Please try again later.");
    }
};

const updateUser = async (_, { input }) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(input._id, input, { new: true });
        if (!updatedUser) {
            return new Error("User not found");
        }
        return updatedUser;
    } catch (error) {
        console.error("Failed to update user:", error);
        return new Error("Failed to update user. Please try again later.");
    }
};

const deleteUser = async (_, { _id }) => {
    try {
        const deletedUser = await User.findByIdAndDelete(_id);
        if (!deletedUser) {
            return new Error("User not found");
        }
        return deletedUser;
    } catch (error) {
        console.error("Failed to delete user:", error);
        return new Error("Failed to delete user. Please try again later.");
    }
};

export const userResolver = {
    Query: {
        getUsers,
        getUserProfile
    },
    Mutation: {
        login,
        createUser,
        updateUser,
        deleteUser
    }
};
