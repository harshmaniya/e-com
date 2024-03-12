import { Category } from "@/lib/models"

const addCategory = async (_, args) => {
    try {
        const { name } = args
        const isExist = await Category.findOne({name})
        if (isExist) return new Error("this category already exist!")
        const addCategory = await Category.create({name})
        if (!addCategory) return new Error("getting error in category creation!")
        console.log("🚀 ~ addCategory ~ addCategory:", addCategory)
        return addCategory;
    } catch (error) {
        console.log("🚀 ~ addCategory ~ error:", error.message)
        return new Error("🚀 ~ addCategory ~ error:", error.message)
    }
}

const getAllCategories = async () => {
    try {
        const getAllCategory = await Category.find()
        if (!getAllCategory) return new Error("not found category!")
        console.log("🚀 ~ getAllCategory ~ getAllCategory:", getAllCategory)
        return getAllCategory
    } catch (error) {
        console.log("🚀 ~ getAllCategory ~ error:", error.message)
        return new Error(error.message)
    }
}

export const categoryResolver = {
    Query: {
        getAllCategories
    },
    Mutation: {
        addCategory
    }
}