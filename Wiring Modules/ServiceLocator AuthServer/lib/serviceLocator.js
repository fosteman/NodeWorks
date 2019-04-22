//serviceLocator.js
module.exports = function() {
    const dependencies = {};
    const factories = {};
    const serviceLocator = {};
    //associate component name against it's factory
    serviceLocator.factory = (name, factory) => factories[name] = factory;
    //associate directly with an instance
    serviceLocator.register = (name, instance) => dependencies[name] = instance;
    //retrieve component by name
    serviceLocator.get = name => {
        if(!dependencies[name]) {
            const factory = factories[name];
            dependencies[name] = factory && factory(serviceLocator); //factory is invoked by injecting the current instance of the service locator.
            if (!dependencies[name]) throw new Error(`No such module: ${name}`);
        }
        return dependencies[name];
    };
    return serviceLocator;
};
