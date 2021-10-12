const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully !'.cyan.underline);
  } catch (error) {
    console.log('Error: '.red.underline + error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
