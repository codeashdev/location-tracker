const app = require('express')();
const http = require('http').Server(app);
const { Server } = require('socket.io');

const io = new Server(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// const { networkInterfaces } = require('os');

// function getLocalIpAddress() {
//   const interfaces = networkInterfaces();
//   for (const interfaceName of Object.keys(interfaces)) {
//       for (const iface of interfaces[interfaceName]) {
//           if (iface.family === 'IPv4' && iface.internal === false) {
//               return iface.address;
//           }
//       }
//   }
//   return null;
// }

// const localIpAddress = getLocalIpAddress();
// if (localIpAddress) {
//   console.log(`Local IP address: ${localIpAddress}`);
// } else {
//   console.error('Local IP address not found.');
// }

const ROLES = {
  USER: 'user',
  CARRIER: 'carrier',
  ADMIN: 'admin',
};

io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);

  // Handle role assignment
  socket.on('set_role', (role) => {
      socket.role = role;
      console.log(`Server: User ${socket.id} set role as ${role}`);
// Emit the assigned role back to the client
      socket.emit('user_role', role);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
      console.log(`Server: User disconnected ${socket.id}`);
  });

  socket.on('send_data', (data) => {
    try {
      // console.log('Sending data to USER and ADMIN:', data);
      socket.broadcast.emit('receive_data', data);
        // switch (socket.role) {
        //     case ROLES.USER:
        //         console.log('Sending data to ADMIN:', data);
        //         socket.broadcast.to(ROLES.ADMIN).emit('receive_data', data);
        //         // io.to(ROLES.ADMIN).broadcast.emit('receive_data', data);
        //         break;
        //     case ROLES.ADMIN:
        //         console.log('Sending data to CARRIER:', data);
        //         socket.broadcast.to(ROLES.CARRIER).emit('receive_data', data);
        //         // io.to(ROLES.CARRIER).broadcast.emit('receive_data', data);
        //         break;
        //     case ROLES.CARRIER:
        //         console.log('Sending data to USER and ADMIN:', data);
        //         socket.broadcast.to(ROLES.USER).emit('receive_data', data);
        //         socket.broadcast.to(ROLES.ADMIN).emit('receive_data', data);
        //         // io.to(ROLES.USER).broadcast.emit('receive_data', data);
        //         // io.to(ROLES.ADMIN).broadcast.emit('receive_data', data); // Optional: Send data to admin as well
        //         break;
        //     default:
        //         console.log(`Unknown role: ${socket.role}`);
        //         // Handle the case where the role is not defined or invalid
        //         // You can emit an error message to the client
        //         // socket.emit('error', 'Invalid role');
        //         break;
        // }
    } catch (error) {
        console.error('Error sending data:', error.message);
        // Handle the error appropriately, such as emitting an error message to the client
        // socket.emit('error', error.message);
    }
});

});
  // Handle data transmission
 


app.get('/', (req, res) => {
  res.send('Server is running'); // Send a response to indicate that the server is running
});

const PORT = 4000;

http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
