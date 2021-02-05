const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const {Chess} = require('chess.js');
const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.of('/game').on('connection', (socket) => {
  console.log(`${socket.id} connected`);

  socket.on('join', (room) => {
    if(io._nsps.get('/game').adapter.rooms.get(room) === undefined || io._nsps.get('/game').adapter.rooms.get(room).size < 2) {
      socket.join(room);
      console.log(`${socket.id} joined ${room}`);
      console.log(io._nsps.get('/game').adapter.rooms.get(room).size);
      let chess = new Chess();
      let colour = io._nsps.get('/game').adapter.rooms.get(room).size === 1 ? 'black' : 'white';
      socket.emit('start', chess, colour)
    }
    else {
      console.log('failed');
    }
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
  })
})

app.use(router);
app.use(cors());

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));