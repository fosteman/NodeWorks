const JsonConfig = require('./jsonConfig');

const jsonConfig = new JsonConfig();
jsonConfig.read('sample.json');
jsonConfig.set('key', 'value');
jsonConfig.save('sample.json');
