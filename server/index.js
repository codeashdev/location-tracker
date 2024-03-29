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

const roleToIdMap = {};

io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);

  // Handle role assignment
  socket.on('set_role', (role) => {
    const id = socket.id
    roleToIdMap[role] = id;
      const userRole = socket.role = {id, role};
      console.log(`Server: User ${id} set role as ${role}`);
// Emit the assigned role back to the client
      socket.emit('user_role', userRole);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
      console.log(`Server: User disconnected ${socket.id}`);
  });

  socket.on('send_data', (data) => {
    const userRole = socket.role;
    try {
        switch (userRole.role) {
            case ROLES.USER:
                // console.log('Sending data to ADMIN:', data);
                const adminId = roleToIdMap[ROLES.ADMIN];
                if (adminId) {
                    socket.broadcast.to(adminId).emit('receive_data', data);
                }
                break;
            case ROLES.ADMIN:
                // console.log('Sending data to CARRIER:', data);
                const carrierId = roleToIdMap[ROLES.CARRIER];
                if (carrierId) {
                    socket.broadcast.to(carrierId).emit('receive_data', data);
                }
                break;
            case ROLES.CARRIER:
                // console.log('Sending data to USER and ADMIN:', data);
                const userId = roleToIdMap[ROLES.USER];
                if (userId) {
                    socket.broadcast.to(userId).emit('receive_data', data);
                }
                const adminIdForCarrier = roleToIdMap[ROLES.ADMIN];
                if (adminIdForCarrier) {
                    socket.broadcast.to(adminIdForCarrier).emit('receive_data', data);
                }
                break;
            default:
                console.log(`Unknown role: ${socket.role}`);
                break;
        }
    } catch (error) {
        console.error('Error sending data:', error.message);
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
