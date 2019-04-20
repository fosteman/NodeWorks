/*Code Profiler using factory
start - begins timer
end - terminate sessiosn and logs it's execution time to the console*/

//To try the program with profiling enabled, run the following command:
//export NODE_ENV=development; node profilerTest
class Profiler {
	constructor(label) {
		this.label = label;
		this.lastTime = null;
	}
	start() {
		this.lastTime = process.hrtime(); //high resolution
	}
	end() {
		const diff = process.hrtime(this.lastTime);
		console.log(`Timer ${this.label} took ${diff[0]} s and ${diff[1]} ns.`);
	}
};
//factory abstracts the creation of the Profiler object, 
//so that, depending on whether the application runs in production or development mode, 
//it returns a fully working Profiler object, or alternatively, a mock object with the same interface, but with empty methods.

function factory(label) {
	if (process.end.NODE_ENV === 'dev') return new Profiler(label);
	else if (process.env.NODE_ENV === 'prod')
		return { //dynamic typing, duck typing
			start: function() {},
			end: function() {}
		}
	else throw new Error('Wrong process.env');
};

let process.env.NODE_ENV = true;

function test(len) {
	const p = factory(`Generating a 1e6 items long array`);
	p.start();
	const arr = [];
	for (let i = 0; i < 1e6; i++)
		arr.push(Math.random());
	p.end();
}

test(len);
console.log('Done');



