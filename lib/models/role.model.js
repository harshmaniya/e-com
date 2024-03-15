import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['admin', 'user']    
    },
});

const Role = mongoose.models.Role || mongoose.model("Role", RoleSchema);
export default Role;