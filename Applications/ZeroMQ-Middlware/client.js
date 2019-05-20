//client.js
const zmq = require('zmq');
const zmqMiddlewareManager = require('zmqMiddlewareManager');
const jsonMiddleware = require('jsonMiddleware');
const request = zmq.socket('req');
request.connect('tcp://127.0.0.1:3000');
const zmqm = new zmqMiddlewareManager(request);
zmqm.use(jsonMiddleware.json());
zmqm.use({
    inbound: function (message, next) {
        console.log(`Echoed back: ${message.data}`);
        next();
    }
});

setInterval(() => zmqm.send({
    action: 'ping',
    echo: Date.now()
}), 1000);
