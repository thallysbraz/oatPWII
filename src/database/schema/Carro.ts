import mongoose from "mongoose";

const Carro = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    marca: {
        type: String,
        required: true,
        lowercase: true
    },
    modelo: {
        type: String,
        required: true,
        lowercase: true
    },
    id: {
        type: Number,
        unique: true,
    }
});

export default mongoose.model("Carro", Carro);