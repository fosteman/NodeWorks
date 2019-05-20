//server.js
const jot = require('json-over-tcp');
const server = jot.server.createServer(3000);
server.on('connection', socket => socket.on('data', data => console.log(`Client data ${data}`)));
server.listen(3000, () => console.log('listening...'));
