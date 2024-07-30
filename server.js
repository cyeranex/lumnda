const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const socketIo = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

let onlineUsers = {};

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('join', (user) => {
      onlineUsers[socket.id] = user;
      io.emit('onlineUsers', onlineUsers);
    });

    socket.on('codeChange', (data) => {
      socket.broadcast.emit('codeUpdate', data);
    });

    socket.on('typing', (user) => {
      socket.broadcast.emit('userTyping', user);
    });

    socket.on('disconnect', () => {
      delete onlineUsers[socket.id];
      io.emit('onlineUsers', onlineUsers);
      console.log('Client disconnected');
    });
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
