const server = require('http').createServer()
const io = require('socket.io')(server)
const path = require('path');
const fs = require('fs');
const publicDir = path.join(__dirname, "public");

const PORT = 3000;

server.listen(PORT)

console.log('listening port:', PORT)


server.on('request', (req, res) => {
  try {
    // Let socket.io handle its own requests
    if (req.url.startsWith('/socket.io/')) {
      return;
    }
    const requestedPath = req.url === '/' ? 'index.html' : req.url;
    const filePath = path.join(publicDir, requestedPath);
    fs.createReadStream(filePath)
      .on('error', () => {
        fs.createReadStream(path.join(publicDir, 'index.html')).pipe(res);
      })
      .pipe(res);
  } catch (error) {
    console.error(error)
  }
});

let readyPlayerCount = 0

io.on("connection", (socket) => {
  console.log('a user connected', socket.id)

  socket.on('ready', () => {
    console.log("Player ready", socket.id)
    readyPlayerCount++;

    if (readyPlayerCount === 2) {
      //broadcast start game event
    }
  })
})