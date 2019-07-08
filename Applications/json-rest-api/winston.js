const { createLogger, format, transports } = require('winston');
const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const logDir = 'log';

if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const filename = path.join(logDir, 'server.log');

const prettyJson = format.printf(info => {
    if (info.message.constructor === Object) {
        info.message = JSON.stringify(info.message, null, 4)
    }
    return `${info.level}: ${info.message}`
});

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.colorize(),
        format.prettyPrint(),
        format.splat(),
        format.simple(),
        prettyJson
    ),
    transports: [
        new transports.Console({
            level: 'debug',
            format: format.combine(
                format.colorize(),
                format.printf(
                    info => `${info.level}: ${info.message}`
                )
            )
        }),
        new transports.File({ filename })
    ]
});
module.exports = logger;
