import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  profileImage: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["Product Owner", "Scrum Master", "Development Team","admin"],
    required: true,
  },
  isAdmin: { type: Boolean, default: false },
});


export const User = mongoose.model("User", userSchema);
