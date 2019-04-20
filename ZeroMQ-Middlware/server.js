//server.js
/*To use this infrastructure, client will ping server, receiving echoed response.
* */
const zmq = require('zmq');
const ZmqMiddlewareManager = require('./zmqMiddlewareManager');
const jsonMiddleware = require('./jsonMiddleware');
const reply = zmq.socket('rep');
reply.bind('tcp://127.0.0.1:3000');

//initialize middleware manager
const zmqm = new ZmqMiddlewareManager(reply);
zmqm.use(jsonMiddleware.json());
zmqm.use(
    {
        inbound: function (msg, next) {
            console.log(`Received ${msg.data}`);
            if (msg.data.action === 'ping') this.send(
                {
                    action: 'pong',
                    echo: msg.data.echo
                });
            next();
        }
    }
);
