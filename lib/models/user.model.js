import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }],
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    },
    wishlist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wishlist"
    }
},
{
    timestamps: true
});


UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.models.User || mongoose.model("User", UserSchema)
export default User