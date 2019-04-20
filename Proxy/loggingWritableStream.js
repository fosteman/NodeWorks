//Logging writable stream
//Object acts as a proxy to Writable, intercepting write() method and logging message. Uses object composition.

function createLoggingWritable(writableOriginal) {
    const proto = Object.getPrototypeOf(writableOriginal);
    function LoggingWritable(writableOriginal) {
        this.writableOrig = writableOriginal;
    }
    //pseudo-inheritance
    LoggingWritable.prototype = Object.create(proto);
    //override - logging feature
    LoggingWritable.prototype.write =
        function (chunk, encoding, cb) {
        //async functions
        if (!cb && typeof encoding === 'function') {
            cb = encoding;
            encoding = undefined;
        }
        console.log('Writing a chunk: "', chunk, '"...done');
        return this.writableOrig.write(chunk, encoding,
            function ()
        {
            console.log('Finished writing ', chunk);
            //execute original callback to complete the proxification
            cb && cb();
        });
        };
    //delegation
    LoggingWritable.prototype.on =
        function ()
        {
            return this.writableOrig.on
                .apply(this.writableOrig, arguments);
        };
    //delegation
    LoggingWritable.prototype.end =
        function ()
        {
            return this.writableOrig.end
                .apply(this.writableOrig, arguments);
        };
    return new LoggingWritable(writableOriginal);
}

const fs = require('fs');

const writable = fs.createWriteStream('writableStream.log');
const writableProxy = createLoggingWritable(writable);
writableProxy.write('1');
writableProxy.write('2');
writable.write('not logged');
writableProxy.end();
