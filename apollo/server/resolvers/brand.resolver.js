import { Brands } from "@/lib/models"

const addBrand = async (_, args) => {

    try {
        const { name } = args
        const isExist = await Brands.findOne({name})
        if (isExist) return new Error("this brand already exist!")
        const addBrand = await Brands.create({name})
        if (!addBrand) return new Error("getting error in brand creation!")
        console.log("🚀 ~ addBrand ~ addBrand:", addBrand)
        return addBrand;
    } catch (error) {
        console.log("🚀 ~ addBrand ~ error:", error.message)
        return new Error("🚀 ~ addBrand ~ error:", error.message)
    }
}

const getAllBrands = async () => {
    try {
        const getAllBrands = await Brands.find()
        if (!getAllBrands) return new Error("not found brand!")
        console.log("🚀 ~ getAllBrands ~ getAllBrands:", getAllBrands)
        return getAllBrands
    } catch (error) {
        console.log("🚀 ~ getAllBrands ~ error:", error.message)
        return new Error(error.message)
    }
}

export const brandResolver = {
    Query: {
        getAllBrands
    },
    Mutation: {
        addBrand
    }
}