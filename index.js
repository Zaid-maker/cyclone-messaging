const express = require('express');
const http = require('http');

//DOTENV
require('dotenv').config();
const PORT = process.env.PORT || 6000;

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: 'http://messaging.cyclonebotlist.xyz',
    methods: ['GET', 'POST']
  }
});

io.on('connection', socket => {
  console.log('Connection made successfully');
  const id = socket.handshake.query.id
  socket.join(id)

  socket.on('send-message', ({ recipients, text }) => {
    recipients.forEach(recipient => {
      const newRecipients = recipients.filter(r => r !== recipient)
      newRecipients.push(id)
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipients, sender: id, text
      })
    })
  })
})

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
