import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectionDB = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${connectionDB.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
