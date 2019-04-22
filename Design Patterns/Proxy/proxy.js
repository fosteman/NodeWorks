/*Pattern: proxy \ surrogate 
A proxy transparently intercepts all or some of the operations executed on the subject,
complementing the behaviour with pre\post-processing
Proxification occurs on class instances, persisting state
Scenarios: 
Input-data-validation
Verification of authorization
Caching of internal state, hence operations are executed on the subject if only cache is empty.
Lazy initialization of objects, whence necessary
Logging of invocations with relative parameters
Remote object connection

Techniques of implementation:
1. Object composition in order to extend functionality, storing the injected source object in 
local variable, while providing the same interface.
2.


*/
//Composing proxy out of class

function createProxy(subject) {
	function Proxy(subject) {
		this.subject = subject;
		//preudo-classical inheritance to maintain the prototype chain
		this.prototype = Object.create(Object.getPrototypeOf(subject);
			// proxy instaceof Subject: true
	}
	//proxification
	Proxy.prototype.hello = function() {
		return this.subject.hello() + `it's me !`;
	}
	//delegation
	Proxy.prototype.Iwas = function() {
		return this.subject.Iwas.apply(this.subject, arguments);
	}
	return new Proxy(subject);
}

//Alternative proxy out of factory
function createProxy(subject) {
	return {
		//proxified method
		hello: () => subject.hello() + `it's me`,
		//delegated method
		Iwas: () => subject.Iwas.apply(subject, arguments),
		Iwas: () => Object.defineProperty(subject, this.Iwas.apply(this, arguments), );
	};
}

//Object augmentation \ Monkey patching - modification of the subject directly
function createProxy(subject) {
	const hello = subject.hello;
	subject.hello = () => (this.hello.call(this) + `it's me`);
	return subject;
}
//Composition is the safest way, for it doesn't modify the subject, while also most verbose
//Augmentation modifies the subject directly.


