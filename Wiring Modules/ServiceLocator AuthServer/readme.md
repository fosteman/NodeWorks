Note: Express server instance is a simple service locator. expressApp.set(name, instance) to register a service and expressApp.get(name) to then retrieve it. request.app property holds the instances.

Service locator and Dependency Injection patterns shift the dependency ownership to an entity external to the component

In terms of reusability, service locator pattern sits inbetween hardcoded dependencies and DI. In terms of convenience and simplicity, it is definitely better than manual DI, as building the entire dependency graph is automatic.