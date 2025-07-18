import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connectDb=async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
         console.log("✅ Connected to MongoDB Atlas");
    } catch (err) {
        console.error("❌ MongoDB connection failed", err);
    process.exit(1);
    }
}
export default connectDb