
import { createServer } from 'http';
import { Server } from 'socket.io'
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
});



const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://something.com'
  : 'http://localhost:3003';

io.on("connection", (socket) => {
  console.log('user connected with through 3003 socket id', socket.id);
  socket.on('vid', (msg) => {
    console.log('message: ' + msg);
  });
});

const port2 = process.env.PORT || 3004
httpServer.listen(port2, () => {
    console.log("boro!http://localhost:3004");
  
})