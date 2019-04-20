//Decorator is a structural patters dynamically augmenting the behaviour of an object. Behaviour is not added to the prototype, hence it's not inheritance, but an explicit Decoration.
//Terminology: Decorator object extends Component object by adding a method.

//Implementation via Composition, whence Component is wrapped around an object, usually sustaining prototypical chain (pseudo-inheritance)
function decorateCompose(component) {
    const proto = Object.getPrototypeOf(component);

    function Decorator(component) {
        this.componentOrig = component;
    }
    //pseudo inheritance
    Decorator.prototype = Object.create(proto);
    //new methodc
    Decorator.prototype.greetings = () => 'Hi!';
    //delegated method
    Decorator.prototype.hello = function () {
        return this.componentOrig.hello.apply(this.componentOrig, arguments);
    };
    return new Decorator(component);
}

//Implementation via augmentation. Attaching methods directly to Component
function decorateAug (component) {
    component.greetings = () => 'Hi!';
    return component;
}
