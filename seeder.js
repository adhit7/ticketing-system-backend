import dotenv from 'dotenv';
import admin from './data/admin.js';
import Admin from './models/Admin.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importAdmin = async () => {
  try {
    await Admin.insertMany(admin);

    console.log('Admin users data Imported!');

    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importAdmin();
