import { createServer } from 'http';
import { Server } from 'socket.io'
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
});




io.on("connection", (socket) => {
  console.log('user connected with socket id', socket.id);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (msg, user) => {
    io.emit('chat message', msg, socket.id, user.username);
    console.log('message: ' + msg);
  });
});
const port2 = process.env.PORT || 3002
httpServer.listen(port2, () => {
    console.log("boro!");
  
})