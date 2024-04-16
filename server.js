import express from 'express';
import dotenv from 'dotenv';
import adminRoutes from './routes/adminRoutes.js';
import learnerRoutes from './routes/learnerRoutes.js';
import mentorRoutes from './routes/mentorRoutes.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import http from 'http';
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

// const io = new Server(server, {
//   pingTimeout: 60000,
//   cors: {
//     orgin: 'http://localhost:5173/',
//   },
// });

// io.on('connection', (socket) => {
//   console.log('socket is connected');
//   socket.on('setup', (user) => {
//     socket.join(user?.email);
//     socket.emit('user socket connected');
//   });
// });

// //when ceonnect
// console.log('a user connected.');

// //take userId and socketId from user
// socket.on('addUser', (userId) => {
//   addUser(userId, socket.id);
//   io.emit('getUsers', users);
// });

// //send and get message
// socket.on('sendMessage', ({ senderId, receiverId, text }) => {
//   const user = getUser(receiverId);
//   io.to(user.socketId).emit('getMessage', {
//     senderId,
//     text,
//   });
// });

// //when disconnect
// socket.on('disconnect', () => {
//   console.log('a user disconnected!');
//   removeUser(socket.id);
//   io.emit('getUsers', users);
// });
