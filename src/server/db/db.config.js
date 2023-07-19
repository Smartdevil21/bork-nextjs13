import mongoose from "mongoose";
const DB = process.env.DB || "mongodb://localhost:27017/bork_db";
const db = mongoose.connect(DB);
//   .then(() => {
//     console.log("Connection Successful!");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
export { db };
