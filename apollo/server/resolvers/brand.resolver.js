import { Brand, Product } from "@/lib/models";
import { combineResolvers } from "graphql-resolvers";
import { isAuthenticatedAdmin } from '@/apollo/server/utils/middleware';

// done
const addBrand = combineResolvers(isAuthenticatedAdmin, async (_, args) => {
    try {
        const { name } = args;

        // Data validation
        if (!name) {
            return new Error("Brand name is required.");
        }

        // Check if brand already exists
        const existingBrand = await Brand.findOne({ name });
        if (existingBrand) {
            return new Error("Brand already exists!");
        }

        // Create new brand
        const newBrand = await Brand.create({ name });
        console.log("New brand created:", newBrand);

        return newBrand;
    } catch (error) {
        console.error("Error adding brand:", error);
        return new Error("Failed to add brand");
    }
});

// done
const getAllBrands = async (_, args) => {    
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

// done
const updateBrand = combineResolvers(isAuthenticatedAdmin, async (_, args) => {
    try {
        const { _id, name } = args;

        // Data validation
        if (!name) {
            return new Error("Brand name is required.");
        }

        // Update brand
        const updatedBrand = await Brand.findByIdAndUpdate(_id, { name }, { new: true });
        if (!updatedBrand) {
            return new Error("Brand not found");
        }
        console.log("Updated brand:", updatedBrand);

        return updatedBrand;
    } catch (error) {
        console.error("Error updating brand:", error);
        return new Error("Failed to update brand");
    }
});

// done
const deleteBrand = combineResolvers(isAuthenticatedAdmin, async (_, { _id }) => {
    try {

        const isAssigned = await Product.findOne({ brand: _id });
        if (isAssigned) return new Error("this brand is assigned to products");

        // Delete brand
        const deletedBrand = await Brand.findByIdAndDelete(_id);
        if (!deletedBrand) return new Error("Brand not found");
        console.log("Deleted brand:", deletedBrand);

        return "Brand deleted successfully";
    } catch (error) {
        console.error("Error deleting brand:", error);
        return new Error("Failed to delete brand");
    }
});

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
