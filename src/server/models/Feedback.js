import mongoose from "mongoose";

const feedBackSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    minlength: 2,
  },
});

export const FeedBack =
  mongoose.models.feedback || mongoose.model("feedback", feedBackSchema);
