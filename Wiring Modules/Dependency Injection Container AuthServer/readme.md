A DI container is essentially a service locator that identifies the dependency requirements of a module before instantiating it

Each module doesn't have to depend on the service locator, it can simply express its need in terms of dependencies and the DI container will do the rest seamlessly
To obtain list of dependencies invoke toString() on the function reference; with regular expressions, obtaining the arguments list is certainly not black magic. Though it has downsides regarding code-shrinkers.
This technique of injecting a set of dependencies using the names of the arguments of a function was popularized by AngularJS.
