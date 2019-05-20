/*
Middleware as a pattern is an amalgamation of the Intercepting Filter Pattern and the Chain of Responsibility pattern. It resembles a processing pipeline. Advantage: flexibility of plugin infrastructure.
Conventions:
    New middleware is registered by invoking use(), it is then appended to the end of pipeline
    Registered middleware is invoked asynchronously, passing data to process.
    Each middleware may break the pipeline, emitting a handled error.
Usage:
    Augmenting data with properties or functions
    Replacing data
    Returning fresh copies to allow immutability of the source.
*/

/*
ZeroMQ is a messaging library, which provides interface for exchanging atomic messages across protocols. It is often chosen to build custom messaging architectures.
XREF: Chapter 11: Messaging and Integration Patterns
The following is the example of middleware infrastructure to abstract pre&post processing of the data passing through a ZMQ socket.
*/

/*zmqMiddlewareManager.js - The Middleware Manager*/
module.exports = class ZmqMiddlewareManager {
    constructor(socket) {
        this.sock = socket;
        this.inboundMiddleware = [];
        this.outboundMiddleware = [];
        //invoke middleware pipeline
        sock.on('message', message => this.executeMiddleware
            (
                this.inboundMiddleware,
                {data: message})
        );
    }
    send(data) {
        const msg = {data: data};
        this.executeMiddleware
        (
            this.outboundMiddleware,
            msg,
            () => this.sock.send(msg.data)
        );
    }
    use(middleware) {
        if (middleware.inbound) {
            this.inboundMiddleware.push(middleware.inbound);
        }
        if (middleware.outbound) {
            this.outboundMiddleware.push(middleware.outbound);
        }
    }
    executeMiddleware(middleware, arg, next) {
        //Asynchronous sequential iteration
        function iterator(index) {
            if (index === middleware.length) return next && next();
            middleware[index].call(
                this,
                arg,
                err => {
                    err ? console.error(`${err.message}`)
                        : iterator.call(this, ++index);
                }
            );
        } //end (f) iterator
        //init(0)
        iterator.call(this, 0);
    }
};
