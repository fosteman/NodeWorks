//Pattern: EventEmmiter
/*
In this chapter I learned basics of callbacks, events. 
Apropriate usage of events is at times of need to report states momentarily.
Callbacks on the other hand will only propagate once per call.
Evidently, I practiced ES6 syntactic sugar library 'util'. 
Extended class with inherit(), super() constructor, and declared methods (.on, .find, .addFile)
forEach, push, match
fs module's asynchronous readFile.
*/
const EventEmmiter = require ('EventEmmiter');
const fs = require('fs');
class find extends EventEmmiter {
	constructor(regex) {
		super();
		this.files = [];
		this.regex = '';
	}
	addFile(file) {
		this.files.push(file);
		return this;
	}
	find () {
		this.files.forEach(file => {
			fs.readFile(file, [], (err, content) => {
				if (err) this.emit('error', err);
				this.emit('fileread', file);
				let match = null;
				match = content.match(this.regex);
				if (match)
					match.forEach(elem => this.emit('match', file, elem));
			});
		});
		return this;
	}
}

const newObj = new find('regex'); //learn regex
newObj.addFile('File1.dat');
newObj.find()
	.on('match', (file, elem) => console.log('Match in ' + file + " : " + elem))
	.on('error', err => console.err(err));