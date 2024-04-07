import express from 'express';
import dotenv from 'dotenv';
import adminRoutes from './routes/adminRoutes.js';
import learnerRoutes from './routes/learnerRoutes.js';
import mentorRoutes from './routes/mentorRoutes.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { errorHandler, notFound } from './middleware/errorHandler.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Ticketing System API is running....');
});

app.use('/admin', adminRoutes);
app.use('/learner', learnerRoutes);
app.use('/mentor', mentorRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
