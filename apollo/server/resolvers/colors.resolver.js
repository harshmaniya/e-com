import { Colors } from "@/lib/models"

const addColor = async (_, args) => {
    try {
        const { name, hexCode } = args.input
        const isExist = await Colors.findOne({ name, hexCode })
        if (isExist) return new Error("this color already exist!")
        const addColor = await Colors.create({name, hexCode})
        if (!addColor) return new Error("getting error in color creation!")
        console.log("🚀 ~ addColor ~ addColor:", addColor)
        return addColor;
    } catch (error) {
        console.log("🚀 ~ addColor ~ error:", error.message)
        return new Error("🚀 ~ addColor ~ error:", error.message)
    }
}

const getAllColors = async () => {
    try {
        const getAllColors = await Colors.find()
        if (!getAllColors) return new Error("not found color!")
        console.log("🚀 ~ getAllColors ~ getAllColors:", getAllColors)
        return getAllColors
    } catch (error) {
        console.log("🚀 ~ getAllColors ~ error:", error.message)
        return new Error(error.message)
    }
}

export const colorResolver = {
    Query: {
        getAllColors
    },
    Mutation: {
        addColor
    }
}