//onlineState.js

module.exports = class OnlineState {
    constructor(socket) {
        this.s = socket;
    }
    send(data) {
        this.s.socket.write(data);
    }
    activate() {
        //flushes all queued data into the socket (this.s), starts listening for error events.
        this.s.queue.forEach(data => this.s.socket.write(data));
        this.s.queue = [];
        this.s.socket.once('error', () => this.s.changeState('offline'));
    }
}
