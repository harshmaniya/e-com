import { Brand } from "@/lib/models";

const addBrand = async (_, { input }) => {
    try {
        const { name } = input;

        // Data validation
        if (!name) {
            throw new Error("Brand name is required.");
        }

        // Check if brand already exists
        const existingBrand = await Brand.findOne({ name });
        if (existingBrand) {
            throw new Error("Brand already exists!");
        }

        // Create new brand
        const newBrand = await Brand.create({ name });
        console.log("New brand created:", newBrand);

        return newBrand;
    } catch (error) {
        console.error("Error adding brand:", error);
        throw new Error("Failed to add brand");
    }
};

const getAllBrands = async () => {
    try {
        const getAllBrands = await Brand.find()
        if (!getAllBrands) return new Error("not found brand!")
        console.log("🚀 ~ getAllBrands ~ getAllBrands:", getAllBrands)
        return getAllBrands
    } catch (error) {
        console.log("🚀 ~ getAllBrands ~ error:", error.message)
        return new Error(error.message)
    }
}

const updateBrand = async (_, { _id, input }) => {
    try {
        const { name } = input;

        // Data validation
        if (!name) {
            throw new Error("Brand name is required.");
        }

        // Update brand
        const updatedBrand = await Brand.findByIdAndUpdate(_id, { name }, { new: true });
        if (!updatedBrand) {
            throw new Error("Brand not found");
        }
        console.log("Updated brand:", updatedBrand);

        return updatedBrand;
    } catch (error) {
        console.error("Error updating brand:", error);
        throw new Error("Failed to update brand");
    }
};

const deleteBrand = async (_, { _id }) => {
    try {
        // Delete brand
        const deletedBrand = await Brand.findByIdAndDelete(_id);
        if (!deletedBrand) {
            throw new Error("Brand not found");
        }
        console.log("Deleted brand:", deletedBrand);

        return deletedBrand;
    } catch (error) {
        console.error("Error deleting brand:", error);
        throw new Error("Failed to delete brand");
    }
};

export const brandResolver = {
    Query: {
        getAllBrands
    },
    Mutation: {
        addBrand,
        updateBrand,
        deleteBrand
    }
};
