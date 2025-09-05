const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://barter-media:barter-media-12345@cluster0.ynftqzc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    );
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
}

module.exports = connectDB;