const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/createbharat');

    console.log(`MongoDB Connected Successfully`);
  } catch (error) {
    console.error(`Error: ${error.message} in connecting to MongoDB`);
    process.exit(1);
  }
};

module.exports = connectDB;

