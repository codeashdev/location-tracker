const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:4000',
    methods: ['GET', 'POST'],
  },
});

const ROLES = {
  USER: 'user',
  CARRIER: 'carrier',
  ADMIN: 'admin',
};

io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);
  
  // Assume the role is passed from the client
  socket.on('set_role', (role) => {
    socket.role = role;
    console.log(`User ${socket.id} set role as ${role}`);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected ${socket.id}`);
  });

  socket.on('send_data', (data) => {
    switch (socket.role) {
      case ROLES.USER:
        // User sends data to Admin
        io.to(ROLES.ADMIN).emit('receive_data', data);
        break;
      case ROLES.ADMIN:
        // Admin sends data to Carrier
        io.to(ROLES.CARRIER).emit('receive_data', data);
        break;
      case ROLES.CARRIER:
        // Carrier sends data back to User
        io.to(ROLES.USER).emit('receive_data', data);
        break;
      default:
        console.log(`Unknown role: ${socket.role}`);
    }
  });
});

// app.get('/', (req, res) => {
//   res.send('Server is running'); // Send a response to indicate that the server is running
// });

const PORT = 8080;

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
