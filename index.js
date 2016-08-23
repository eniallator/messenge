const express = require('express');
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const users = {}

require('dotenv').config();

io.on("connection", (socket) => {
  console.log("a user connected", socket.id)

  socket.on("login", (username) => {
    users[socket.id] = username
    io.emit("server message", username + " has connected.")

  })

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on("disconnect", () => {
    console.log(socket.id)
    io.emit('server message', users[socket.id] + " has disconnected.");
  })
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/jquery.js', (req, res) => {
  res.sendFile(__dirname + '/node_modules/jquery/dist/jquery.slim.min.js');
});

http.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});
