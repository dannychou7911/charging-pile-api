// db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ 已成功連線 MongoDB');
  } catch (err) {
    console.error('❌ MongoDB 連線失敗', err);
    process.exit(1);
  }
};
