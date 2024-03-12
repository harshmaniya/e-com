import { Brands, Products } from "@/lib/models"

const addProduct = async (_, args) => {
    try {
        const { input } = args
        const SKUisExist = await Products.findOne({ sku: input.sku })
        if (SKUisExist) return new Error("this SKU already taken!")

        // brand
        // if ( typeof input.brand === String ) {
        //     const BrandIsExist = await Brands.findOne({ name: input.brand })
        //     if (!BrandIsExist) return new Error("given brand doesn't exist!")
        //     const df = await Brands.create({name: input.brand})           
        // }

        // colors

        // category

        const addProduct = await Products.create(input)
        if (!addProduct) return new Error("getting error in product creation!")
        console.log("🚀 ~ addProduct ~ addProduct:", addProduct)
        return addProduct;
    } catch (error) {
        console.log("🚀 ~ addProduct ~ error:", error.message)
        return new Error("🚀 ~ addProduct ~ error:", error.message)
    }
}

const getAllProducts = async () => {
    try {
        const getAllProducts = await Products.find()
            .populate([
                { path: "brand", select: "name" },
                { path: "category", select: "name" },
                // { path: "colors", select: "name hexCode" }
            ])
        if (!getAllProducts) return new Error("not found product!")
        console.log("🚀 ~ getAllProducts ~ getAllProducts:", getAllProducts)
        return getAllProducts
    } catch (error) {
        console.log("🚀 ~ getAllProducts ~ error:", error.message)
        return new Error(error.message)
    }
}

const getProduct = async (_, args) => {
    try {
        const { _id } = args
        const getProduct = await Products.findById({ _id })
            .populate([
                { path: "brand", select: "name" },
                { path: "category", select: "name" },
                // { path: "colors", select: "name hexCode" }
            ])
        if (!getProduct) return new Error("not found product!")
        console.log("🚀 ~ getProduct ~ getProduct:", getProduct)
        return getProduct
    } catch (error) {
        console.log("🚀 ~ getProduct ~ error:", error.message)
        return new Error(error.message)
    }
}

export const productResolver = {
    Query: {
        getAllProducts,
        getProduct
    },  
    Mutation: {
        addProduct
    }
}