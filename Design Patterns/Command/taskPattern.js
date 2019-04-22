/*
tast_pattern.js
Reminds of a control flow patter: thunks in combination with generators.
*/

function createTask(target, args) {
	//invoker of Command pattern
	return () => target.apply(null, args);
}
