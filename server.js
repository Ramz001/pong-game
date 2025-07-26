const http = require('http')
const { Server } = require('socket.io')

const apiServer = require('./api')
const sockets = require('./sockets')

const httpServer = http.createServer(apiServer)
const socketServer = new Server(httpServer)

const PORT = 3000;
httpServer.listen(PORT);
console.log(`Listening on port ${PORT}...`);

sockets.listen(socketServer)