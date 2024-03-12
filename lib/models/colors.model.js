import mongoose from "mongoose";

const ColorsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    hexCode: {
        type: String,
        required: true
    }
});

const Colors = mongoose.models.Colors || mongoose.model("Colors", ColorsSchema)
export default Colors