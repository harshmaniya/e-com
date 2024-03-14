import { Category } from "@/lib/models";

const addCategory = async (_, { name }) => {
    try {
        // Data validation
        if (!name) {
            throw new Error("Category name is required.");
        }

        // Check if category already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            throw new Error("Category already exists!");
        }

        // Create new category
        const newCategory = await Category.create({ name });
        console.log("New category created:", newCategory);

        return newCategory;
    } catch (error) {
        console.error("Error adding category:", error);
        throw new Error("Failed to add category");
    }
};

const getAllCategories = async () => {
    try {
        // Fetch all categories
        const allCategories = await Category.find();
        console.log("Fetched categories:", allCategories);

        return allCategories;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw new Error("Failed to fetch categories");
    }
};

const updateCategory = async (_, { _id, name }) => {
    try {
        // Data validation
        if (!name) {
            throw new Error("Category name is required.");
        }

        // Update category
        const updatedCategory = await Category.findByIdAndUpdate(_id, { name }, { new: true });
        if (!updatedCategory) {
            throw new Error("Category not found");
        }
        console.log("Updated category:", updatedCategory);

        return updatedCategory;
    } catch (error) {
        console.error("Error updating category:", error);
        throw new Error("Failed to update category");
    }
};

const deleteCategory = async (_, { _id }) => {
    try {
        // Delete category
        const deletedCategory = await Category.findByIdAndDelete(_id);
        if (!deletedCategory) {
            throw new Error("Category not found");
        }
        console.log("Deleted category:", deletedCategory);

        return deletedCategory;
    } catch (error) {
        console.error("Error deleting category:", error);
        throw new Error("Failed to delete category");
    }
};

export const categoryResolver = {
    Query: {
        getAllCategories
    },
    Mutation: {
        addCategory,
        updateCategory,
        deleteCategory
    }
};
