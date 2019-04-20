//client.js

const failSafeSocket = require('./failSafeSocket')({port: 3000});
setInterval(() => failSafeSocket.send(process.getMemoryUsage()), 1000);

