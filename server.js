import express from 'express';
import dotenv from 'dotenv';
import adminRoutes from './routes/adminRoutes.js';
import learnerRoutes from './routes/learnerRoutes.js';
import mentorRoutes from './routes/mentorRoutes.js';
import queryRoutes from './routes/queryRoutes.js';
import conversationRoutes from './routes/conversationRoutes.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
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
app.use('/query', queryRoutes);
app.use('/conversation', conversationRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, console.log(`Server running on port ${PORT}`));

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    orgin: 'https://zen-class-query.netlify.app/',
  },
});

io.on('connection', (socket) => {
  socket.on('setup', (userData) => {
    socket.join(userData._id);
    socket.emit('connected');
  });

  socket.on('join chat', (room) => {
    socket.join(room);
  });

  socket.on('new message', (room, userInfo, newMessageRecieved) => {
    if (userInfo._id != newMessageRecieved.receiverId) {
      socket.in(room).emit('message received', newMessageRecieved);
    }
  });

  socket.off('setup', (userData) => {
    socket.leave(userData._id);
  });
});
