import express, { Request, Response, NextFunction, Application } from 'express'

import router from './routes'
import main from './connection'
import cors from 'cors'
import { Server } from 'socket.io'
import bodyParser from 'body-parser'
import { createServer } from 'http'

main()
  .then(() => {
    console.log("connected to mongodb successfully");

  })
  .catch((err) => {
    console.log(err);

  })
  const app: Application = express()
  app.use(express.json())
  app.use(cors({
    origin: '*'
  }));
  
  app.use(express.urlencoded({ extended: true }));
  app.use('/routes', router)
  
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
});




io.on("connection", (socket) => {
  console.log('user connected with through 3003 socket id', socket.id);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (msg, user) => {
    io.emit('chat message', msg, socket.id, user.username);
    console.log('message: ' + msg);
  });
});


const port = process.env.PORT || 3001
// const port2 = process.env.PORT || 3002

app.listen(port, (): void => {
  console.log('express server is running on port 3001');

})
httpServer.listen(3003, () => {
  console.log("http-server is running on port 3003");

})