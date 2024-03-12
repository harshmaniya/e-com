import mongoose from "mongoose";

const BrandsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

const Brands = mongoose.models.Brand || mongoose.model("Brand", BrandsSchema)

export default Brands;