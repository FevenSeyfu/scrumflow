import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: Date, required: true, index: true },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Review", "Done"],
      default: "To Do",
    },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    dependencies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    sprint: { type: mongoose.Schema.Types.ObjectId, ref: "Sprint" },
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model("Task", taskSchema);
