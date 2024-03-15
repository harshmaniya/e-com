import { Brand, Category, Color, Product } from "@/lib/models";
import { populate } from "dotenv";

// done
const addProduct = async (_, { input }) => {
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
};


const getAllProducts = async () => {
    try {
        // Fetch all products and populate related fields
        const allProducts = await Product.find()
            .populate([
                { path: "brand" },
                { path: "category" },
                { path: "colors", populate: { path: "color" } }
            ])
        console.log("Fetched products:", allProducts);

        return allProducts;
    } catch (error) {
        console.error("Error fetching products:", error);
        return new Error("Failed to fetch products");
    }
};

const getProduct = async (_, { _id }) => {
    try {
        // Fetch product by ID and populate related fields
        const product = await Product.findById(_id)
            .populate([
                { path: "brand", select: "name" },
                { path: "category", select: "name" },
                { path: "colors", select: "name hexCode" }
            ]);
        if (!product) {
            return new Error("Product not found");
        }
        console.log("Fetched product:", product);

        return product;
    } catch (error) {
        console.error("Error fetching product:", error);
        return new Error("Failed to fetch product");
    }
};

const updateProduct = async (_, { input }) => {
    try {
        const { _id } = input;

        // Update product
        const updatedProduct = await Product.findByIdAndUpdate(_id, input, { new: true });
        if (!updatedProduct) {
            return new Error("Product not found");
        }
        console.log("Updated product:", updatedProduct);

        return updatedProduct;
    } catch (error) {
        console.error("Error updating product:", error);
        return new Error("Failed to update product");
    }
};

const deleteProduct = async (_, { _id }) => {
    try {
        // Delete product
        const deletedProduct = await Product.findByIdAndDelete(_id);
        if (!deletedProduct) {
            return new Error("Product not found");
        }
        console.log("Deleted product:", deletedProduct);

        return deletedProduct;
    } catch (error) {
        console.error("Error deleting product:", error);
        return new Error("Failed to delete product");
    }
};

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
