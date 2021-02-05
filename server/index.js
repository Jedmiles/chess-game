const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const path = require('path');
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

app.use(router);
app.use(cors());
app.use(express.static(path.join(__dirname, "..", "client", "build")));
app.use(express.static(path.join(__dirname, "..", "client", "public")));

io.of('/api/game').on('connection', (socket) => {
  console.log(`${socket.id} connected`);

  socket.on('join', (room, callback) => {
    if(io._nsps.get('/api/game').adapter.rooms.get(room) === undefined || io._nsps.get('/api/game').adapter.rooms.get(room).size < 2) {
      socket.join(room);
      // console.log(`${socket.id} joined ${room}`);
      // console.log(io._nsps.get('/game').adapter.rooms.get(room).size);
      let colour = io._nsps.get('/api/game').adapter.rooms.get(room).size === 1 ? 'black' : 'white';
      socket.emit('start', colour)
      socket.on('move', (pos) => {
        // console.log(`position: ${pos}`);
        socket.to(room).emit('update', pos);
      })
    }
    else {
      console.log('failed');
      callback({isFull: true});
    }
  });


  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
  })
})

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));