/*Revealing contructor pattern, often used along with Promises.
Read-only EventEmitter, where .emit is impossible to call outside,
only from executor function passed into Promise contructor.
*/
const EventEmitter = require('events');

class Roee extends EventEmitter {
	constructor(executorFn) {
		super();
		const emit = this.emit.bind(this); //backup
		this.emit = undefined; //remove from public access
		executorFn(emit); //.emit is only available inside execFn
	}
}

const ticker = new Roee((emit) => {
	let tickCount = 0;
	setInterval(() => emit('tick', tickCount++), 1000); // .emit is available
});

ticker.on('tick', (tickCount) => console.log(tickCount, '-tick event'));
//ticker.emit('', () => {}); <-- TypeError: ticker.emit is not a function
//Not Bulletproof! --> EventEmitter.prototype.emit.call(ticker, 'someEvent', {});

/*
Even if this pattern is quite interesting and clever, it is really hard to find common use cases apart from the Promise constructor.
It's worth mentioning that there is a new specification for streams under development 
that tries to adopt this pattern as a better alternative to the currently used template pattern 
to be able to describe the behavior of various stream objects: https://streams.spec.whatwg. org.
Also it's important to point out that I implemented the ParallelStream class. 
This class accepts as constructor argument the userTransform function (the executor function).
Even if in this case the executor function is not called at construction time, 
but in the internal _transform method of the stream, the general concept of the pattern remains valid*/
