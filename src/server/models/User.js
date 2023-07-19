import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate(val) {
      if (!validator.isEmail(val)) {
        throw new Error();
      }
    },
  },
  contact: {
    type: Number,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 12,
  },
  profession: String,
  createdOn: {
    type: Date,
    default: Date.now,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.models.user || mongoose.model("user", userSchema);

export { User };
