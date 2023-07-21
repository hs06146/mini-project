import mongoose from "mongoose";

const StarbucksSchema = new mongoose.Schema({
    img: String,
    name: String
})

export const Starbucks = mongoose.model("Starbucks", StarbucksSchema);