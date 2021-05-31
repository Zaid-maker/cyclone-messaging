const httpServer = require('http').createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "https://cyclone-messaging.netlify.app",
    methods: ["GET", "POST"]
  }
});

io.on('connection', socket => {
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

httpServer.listen(5000);

console.log('Logged in');