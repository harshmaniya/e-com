import { Category, Product } from "@/lib/models";
import { combineResolvers } from "graphql-resolvers";
import { isAuthenticatedAdmin } from '@/apollo/server/utils/middleware';


// done
const addCategory = combineResolvers(isAuthenticatedAdmin, async (_, { name }) => {
    try {
        // Data validation
        if (!name) {
            return new Error("Category name is required.");
        }

        // Check if category already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return new Error("Category already exists!");
        }

        // Create new category
        const newCategory = await Category.create({ name });
        console.log("New category created:", newCategory);

        return newCategory;
    } catch (error) {
        console.error("Error adding category:", error);
        return new Error("Failed to add category");
    }
});

// done
const getAllCategories = async () => {
    try {
        // Fetch all categories
        const allCategories = await Category.find();
        console.log("Fetched categories:", allCategories);

        return allCategories;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return new Error("Failed to fetch categories");
    }
};

// done - fix
const getCategoryById = async (_, args) => {
    console.log("🚀 ~ getBrandById ~ args:", args)

    const id = args._id
    const category = await Category.findById(id)

    return category
    console.log("🚀 ~ getcategoryById ~ category:", category)
}

// done
const updateCategory = combineResolvers(isAuthenticatedAdmin, async (_, { _id, name }) => {
    try {
        // Data validation
        if (!name) {
            return new Error("Category name is required.");
        }

        // Update category
        const updatedCategory = await Category.findByIdAndUpdate(_id, { name }, { new: true });
        if (!updatedCategory) {
            return new Error("Category not found");
        }
        console.log("Updated category:", updatedCategory);

        return updatedCategory;
    } catch (error) {
        console.error("Error updating category:", error);
        return new Error("Failed to update category");
    }
});

// done
const deleteCategory = combineResolvers(isAuthenticatedAdmin, async (_, { _id }) => {
    try {
        const isAssigned = await Product.findOne({ category: _id });
        if (isAssigned) return new Error("this category is assigned to products");

        const deletedCategory = await Category.findByIdAndDelete(_id);
        if (!deletedCategory) return new Error("Category not found");

        console.log("Deleted category:", deletedCategory);

        return "Category deleted successfully";
    } catch (error) {
        console.error("Error deleting category:", error);
        return new Error("Failed to delete category");
    }
});

export const categoryResolver = {
    Query: {
        getAllCategories,
        getCategoryById
    },
    Mutation: {
        addCategory,
        updateCategory,
        deleteCategory
    }
};
