//jsonConfig.js
//concrete class to derive from abstract base configTemplate.

const util = require('util');
const ConfigTemplate = require('./configTemplate');

module.exports = class JsonConfig extends ConfigTemplate {
    _deserialize(data) {
        return JSON.parse(data);
    }
    _serialize(data) {
        return JSON.stringify(data, null, ' ');
    }
};
