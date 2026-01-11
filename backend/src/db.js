const mongoose = require('mongoose');

/**
 * Connect to MongoDB Atlas or Local instance
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    const dbHost = conn.connection.host;
    const dbName = conn.connection.name;

    console.log('--------------------------------------------------');
    console.log(`🍃 MongoDB Connected!`);
    console.log(`📡 Host: ${dbHost}`);
    console.log(`📁 Database: ${dbName}`);
    console.log('--------------------------------------------------');
  } catch (error) {
    console.error('--------------------------------------------------');
    console.error(`❌ Database Connection Error: ${error.message}`);
    console.error('--------------------------------------------------');
    process.exit(1);
  }
};

module.exports = connectDB;
