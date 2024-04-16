import express, { Request, Response, NextFunction, Application } from 'express'

import router from './routes'
import main from './connection'
import cors from 'cors'
import { Server } from 'socket.io'
import bodyParser from 'body-parser'
import { createServer } from 'http'

main()
  .then(() => {
    //console.log("connected to mongodb successfully");

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


const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://wikinotes-backend.onrender.com'
  : 'http://localhost:3001';

io.on("connection", (socket) => {
  //console.log('user connected with through 3003 socket id', socket.id);
  socket.on('disconnect', () => {
    //console.log('user disconnected');
  });
  socket.on('blob message airdrop', (userid, file, file_type, user, receiverid, chatid) => {
    //console.log('file recieved on airdrop server');
    socket.broadcast.emit('blob message airdrop', userid, file, file_type, user, receiverid, chatid);
  })
  socket.on('blob message send', (userid, file, file_type, user, receiverid, chatid) => {
    //console.log('file recieved on server');
    socket.broadcast.emit('blob message send', userid, file, file_type, user, receiverid, chatid);
  })
  socket.on('fetch_prev_msgs', (chatId, user) => {
    (async () => {
      try {
        const response = await fetch(`${baseURL}/routes/chat/fetch`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ chatId: chatId })
        })


        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        //console.log(data);

        data.messages.forEach((msg: any) => {
          socket.emit('chat message', msg.sender, msg.message, socket.id, user.username, msg.receiver, chatId);
        })
        socket.join(chatId);

      } catch (error) {
        console.log(error);
      }

    })()
  })
  socket.on('chat message', (senderid, msg, user, receiverid, chatId) => {
    io.to(chatId).emit('chat message', senderid, msg, socket.id, user.username, receiverid, chatId);

    fetch(`${baseURL}/routes/chat/chat_msg`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sender: senderid,
        receiver: receiverid,
        message: msg,
        chatid: chatId
      })
    }).then((res) => {
      //console.log(res);
    }).catch((err) => {
      console.log(err);
    })
    //console.log('message: ' + msg);
  });
});


const port = process.env.PORT || 3001
// const port2 = process.env.PORT || 3002

app.listen(port, (): void => {
  //console.log('express server is running on port 3001');

})
httpServer.listen(3003, () => {
  //console.log("http-server is running on port 3003");

})