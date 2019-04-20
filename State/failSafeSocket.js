//failsafeSocket.js
//State is a variation of the Strategy pattern where latter permanently changes depending on the state of context (input data, preferences etc.). To the contrast State pattern is dynamic during the lifetime of the Context enabling behavior to adapt depending on internal state. State transition can be initiated and controlled by the Context object or by the State object. Often Context doesn't want hold all possible variations, so latter is of preference.

//Basic fail-safe socket. A TCP socket diligently collecting logs for archivation on server that might be down. Socket will queue the logs and upload 'em as soon as possible.


const OfflineState = require('./offlineState');
const OnlineState = require('./onlineState');

module.exports =
    factory = (options) => new
class FailsafeSocket {
    constructor(options) {
        this.options = options;
        this.queue = [];
        this.currentState = null;
        this.socket = null;
        this.states = {
            offline: new OfflineState(this),
            online: new OnlineState(this)
        };
        this.changeState('offline');
    }
    changeState(state) {
        console.log(`Activating state: ${state}`);
        this.currentState = this.states[state];
        this.currentState.activate();
    }
    send(data) {
        //delegation of send to currentState will determine where data goes - socket or a queue.
        this.currentState.send(data);
    }
};


