import mongoose from "mongoose";

const StartbucksSchema = new mongoose.Schema({
  name: String,
  img: String
});

// const Board => collection
export const Starbucks = mongoose.model("Starbucks", StartbucksSchema);
