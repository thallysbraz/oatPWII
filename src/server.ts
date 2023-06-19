require('dotenv').config()
import express from "express";
import mongoose from "mongoose";
import routes from "./routes";
const app = express();

mongoose.connect("mongodb://localhost/apiOAT")

app.use(express.json());

app.use(routes)

app.listen(process.env.PORT, () => {
    console.log(`server iniciado na porta: ${process.env.PORT}`)
})