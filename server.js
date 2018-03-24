const http = require('http');
const app = require('./app') 
const port = process.env.PORT || 3000;

const server = http.createServer(app)

server.listen(port)
server.on('listening', onListening);


function onListening() {
   console.log("the server is listening on the port "+port)
  }
  