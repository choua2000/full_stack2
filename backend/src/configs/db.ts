import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  try {
    await mongoose
      .connect(process.env.MONGO_URI as string)
      .then(() => console.log("Connected to Database Successfully"));
  } catch (error) {
    console.error("Server Error", error);
  }
};
export default connectDB;
