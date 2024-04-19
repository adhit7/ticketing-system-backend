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
    orgin: 'http://localhost:5173/',
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
    console.log('33', userData);
    console.log('USER DISCONNECTED');
    socket.leave(userData._id);
  });
});

// io.on('connection', (socket) => {
//   console.log('A user connected.');

//   socket.on('addUser', (userId) => {
//     addUser(userId, socket.id);
//     io.emit('getUsers', Array.from(users.values()));
//   });

//   socket.on('sendMessage', ({ senderId, receiverIds, text }) => {
//     const receivers = getUsersByIds(receiverIds);
//     receivers.forEach((receiver) => {
//       io.to(receiver.socketId).emit('getMessage', {
//         senderId,
//         text,
//       });
//     });
//   });

//   socket.on('disconnect', () => {
//     console.log('A user disconnected!');
//     removeUser(socket.id);
//     io.emit('getUsers', Array.from(users.values()));
//   });
// });

// let activeUsers = [];

// io.on("connection", (socket) => {
//   // add new User
//   socket.on("new-user-add", (newUserId) => {
//     // if user is not added previously
//     if (!activeUsers.some((user) => user.userId === newUserId)) {
//       activeUsers.push({ userId: newUserId, socketId: socket.id });
//       console.log("New User Connected", activeUsers);
//     }
//     // send all active users to new user
//     io.emit("get-users", activeUsers);
//   });

//   socket.on("disconnect", () => {
//     // remove user from active users
//     activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
//     console.log("User Disconnected", activeUsers);
//     // send all active users to all users
//     io.emit("get-users", activeUsers);
//   });

//   // send message to a specific user
//   socket.on("send-message", (data) => {
//     const { receiverId } = data;
//     const user = activeUsers.find((user) => user.userId === receiverId);
//     console.log("Sending from socket to :", receiverId)
//     console.log("Data: ", data)
//     if (user) {
//       io.to(user.socketId).emit("recieve-message", data);
//     }
//   });
// });
