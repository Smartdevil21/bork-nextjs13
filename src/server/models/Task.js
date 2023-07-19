import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    trim: true,
  },
  task: {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    description: {
      type: String,
      trim: true,
    },
    createdOn: {
      type: Date,
      default: Date.now,
      required: true,
    },
    deadline: Date,
    priority: {
      type: Number,
    },
    status: {
      type: String,
      default: "progress",
    },
  },
});

export const Task = mongoose.models.task || mongoose.model("task", taskSchema);
