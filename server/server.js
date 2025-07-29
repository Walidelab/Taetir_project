import app from './src/app.js';
const PORT = process.env.PORT || 5000;
import cors from 'cors';
import { createServer } from 'http'; 

import { Server } from 'socket.io';

const httpServer = createServer(app);


const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
    credentials: true
  }
});

const onlineUsers = new Map();

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id);
    io.emit('online-users', Array.from(onlineUsers.keys()));
  });

  socket.on('send-message', (data) => {
    const { to, from, content } = data;
    const recipientSocketId = onlineUsers.get(to);
    

    if (recipientSocketId) {
      io.to(recipientSocketId).emit('receive-message', {
        from,
        content,
        timestamp: new Date().toISOString()
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);

    for (let [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
    io.emit('online-users', Array.from(onlineUsers.keys()));
  });
});


httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
