import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  type: {
    type: String,
    enum: ["taskAssignment", "projectAssignment", "deadline"],
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

export const Notification = mongoose.model("Notification", notificationSchema);
