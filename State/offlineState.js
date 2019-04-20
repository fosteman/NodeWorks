//offlineState.js

const jot = require('../node_modules/json-over-tcp'); //TCP client\server messaging using JSON

module.exports =
    class OfflineState {
    constructor(socket) {
        this.failSafeSocket = socket;
    }
    send(data) {
        //if offline - store locally
        this.failSafeSocket.queue.push(data);
    }
    activate() {
        //tries to establish connection with server.
        const retry = () => setTimeout(() => this.activate(), 500);
        //connection established
        this.failSafeSocket.socket = jot.connect
        (
            this.failSafeSocket.options,
            () =>
            {
                this.failSafeSocket.socket.removeListener('error', retry);
                this.failSafeSocket.changeState('online');
            }
        );
        this.failSafeSocket.socket.once('error', this.activate);
    }
};
