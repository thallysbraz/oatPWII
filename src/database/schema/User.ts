import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
User.pre("save", async function (next) {
    const hasPassword = await bcrypt.hash(this.password, 12);
    this.password = hasPassword;
    next()
})

export default mongoose.model("User", User);