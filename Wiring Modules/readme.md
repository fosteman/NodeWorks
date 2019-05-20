Wiring modules.

Terms and figures
Tangled dependency graph is a liability and it adds to the technical debt of the project; in such a situation, any change in the code aimed to either modify or extend its functionality can result in tremendous effort
Node.js provides a great tool for organizing and wiring the components of an application together: it's the CommonJS module system
one essential type is the dependency between modules. Properties:
A module is more readable and understandable because (ideally) it's more focused
Being represented as a separate file, a module is easier to identify A module can be more easily reused across different applications

Cohesion: This is a measure of the correlation between the functionalities of a component.
Coupling: This measures how much a component is dependent on the other components of a system

dynamic typing already provides a natural mechanism to decouple the interface (or policy) from the implementation (or detail).

the term Singleton  describes a stateful object exported by a module. Even though it might not be single in realities of node_modules.
