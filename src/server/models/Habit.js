import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  daysSelected: [String],
  doneDates: [String],
  timeOfTheDay: String,
  color: {
    type: String,
    default: "rgb(185, 226, 140)",
  },
  totalTimesDone: {
    type: Number,
    default: 0,
  },
  totalTimesMissed: {
    type: Number,
    default: 0,
  },
  currentStreak: [String],
  bestStreak: {
    type: Number,
    default: 0,
  },
  createdOn: String,
});

export const Habit =
  mongoose.models.habit || mongoose.model("habit", habitSchema);
