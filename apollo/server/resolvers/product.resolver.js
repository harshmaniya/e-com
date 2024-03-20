import { Brand, Category, Color, Product } from "@/lib/models";
import { combineResolvers } from "graphql-resolvers";
import { isAuthenticatedAdmin } from '@/apollo/server/utils/middleware';

// done
const addProduct = combineResolvers(isAuthenticatedAdmin, async (_, { input }) => {
    try {
        const { sku } = input;

        // Check if SKU already exists
        const existingProduct = await Product.findOne({ sku });
        if (existingProduct) {
            return new Error("SKU already taken!");
        }

        const brandIsExist = await Brand.findById({ _id: input.brand });
        const categoryIsExist = await Category.findById({ _id: input.category });

        if (!brandIsExist || !categoryIsExist) {
            return new Error("Brand or Category not found!");
        }

        try {
            await Promise.all(input.colors.map(async (color) => {
                console.log("🚀 ~ input.colors.map ~ color:", color);
                const colorsExist = await Color.findOne({ _id: color });
                if (!colorsExist) {
                    return new Error("Color not found!");
                }
            }));
        } catch (error) {
            console.log("🚀 ~ error:", error.message);
            return new Error("One or more colors not found!");
        }

        // Create new product
        const newProduct = await Product.create(input);
        console.log("New product created:", newProduct);

        return "Product added successfully";
    } catch (error) {
        console.error("Error adding product:", error);
        return new Error("Failed to add product");
    }
});

// done
const getAllProducts = async () => {
    try {
        // Fetch all products and populate related fields
        const allProducts = await Product.find()
            .populate([
                { path: "brand" },
                { path: "category" },
                { path: "colors" }
            ])

        if (!allProducts) return new Error("Products not found");

        console.log("Fetched products:", allProducts);

        return allProducts;
    } catch (error) {
        console.error("Error fetching products:", error);
        return new Error("Failed to fetch products");
    }
};

// done
const getProduct = async (_, { _id }) => {
    try {
        // Fetch product by ID and populate related fields
        const product = await Product.findById(_id)
            .populate([
                { path: "brand" },
                { path: "category" },
                { path: "colors" }
            ])
        if (!product) return new Error("Product not found");
        console.log("Fetched product:", product);

        return product;
    } catch (error) {
        console.error("Error fetching product:", error.message);
        return new Error("Failed to fetch product");
    }
};

// done
const updateProduct = combineResolvers(isAuthenticatedAdmin, async (_, { input }) => {
    try {
        const { _id, ...rest } = input;

        if (rest.sku) {
            const existingSKU = await Product.findOne({ sku: rest.sku });
            if (existingSKU) {
                return new Error("SKU already taken!");
            }
        }

        if (rest.brand) {
            const brandIsExist = await Brand.findById({ _id: rest.brand });
            if (!brandIsExist) {
                return new Error("Brand not found!");
            }
        }

        if (rest.category) {
            const categoryIsExist = await Category.findById({ _id: rest.category });
            if (!categoryIsExist) {
                return new Error("Category not found!");
            }
        }

        if (rest.colors) {
            try {
                await Promise.all(rest.colors.map(async (color) => {
                    const colorsExist = await Color.findOne({ _id: color });
                    if (!colorsExist) {
                        return new Error("Color not found!");
                    }
                }));
            } catch (error) {
                console.log("🚀 ~ error:", error.message);
                return new Error("One or more colors not found!");
            }
        }

        // Update product
        const updatedProduct = await Product.findByIdAndUpdate(_id, { rest }, { new: true });
        if (!updatedProduct) {
            return new Error("Product not found");
        }
        console.log("Updated product:", updatedProduct);

        return updatedProduct;
    } catch (error) {
        console.error("Error updating product:", error);
        return new Error("Failed to update product");
    }
});

// done
const deleteProduct = combineResolvers(isAuthenticatedAdmin, async (_, { _id }) => {
    try {
        // Delete product
        const deletedProduct = await Product.findByIdAndDelete(_id);
        if (!deletedProduct) {
            return new Error("Product not found");
        }
        console.log("Deleted product:", deletedProduct);

        return "Product deleted successfully";
    } catch (error) {
        console.error("Error deleting product:", error);
        return new Error("Failed to delete product");
    }
});

export const productResolver = {
    Query: {
        getAllProducts,
        getProduct
    },
    Mutation: {
        addProduct,
        updateProduct,
        deleteProduct
    }
};
