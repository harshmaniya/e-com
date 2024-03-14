import mongoose from "mongoose";

const ColorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    hexCode: {
        type: String,
        required: true
    }
});

const Color = mongoose.models.Color || mongoose.model("Color", ColorSchema)
export default Color