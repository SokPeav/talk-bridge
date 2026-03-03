import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    const { MONGO_URL } = process.env;
    if (!MONGO_URL) throw new Error("MONGO_URL is not set");
    const connect = await mongoose.connect(ENV.MONGO_URL);
    console.log("Db connected ", connect.connection.host);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
