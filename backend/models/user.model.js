import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  personal: String,
  prefer: String,
  pwd: Number,
  phone: String,
  og: {
    title: String,
    description: String,
    image: String
  }
});

// const Board => collection
export const User = mongoose.model("User", UserSchema);
