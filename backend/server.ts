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
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use('/routes', router)

const httpServer = createServer(app);
const io = new Server(httpServer, { 
  cors:{
  origin: ["http://localhost:5500", "http://localhost:3000"]
},
    
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


const port = process.env.PORT || 3001

app.listen(port, (): void => {
  console.log('initializing...');

})
httpServer.listen(3002, () => {
  console.log("yellow!");

})