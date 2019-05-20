//diContainer
const fnArgs = require('parse-fn-args');
module.exports = function () {
    const dependencies = {};
    const factories = {};
    const diContainer = {};
    diContainer.factory = (name, factory) => {
        factories[name] = factory;
    };
    diContainer.register = (name, dep) => {
        dependencies[name] = dep;
    };
    diContainer.get = name => {
      if (!dependencies[name]) {
          const factory = factories[name];
          dependencies[name] = factory && diContainer.inject(factory);
          if(!dependencies[name]) throw new Error(`No uch module: ${name}`);
      }
      return dependencies[name];
    };
    diContainer.inject = factory => {
        //extract args from factory function and map each argument name to the corresponding dependency instance retreived using the .get method. At the end invoke the factory.
        const args = fnArgs(factory)
            .map(dep => diContainer.get(dep));
        return factory.apply(null, args);
    };
};
