/*
tast_pattern.js
Reminds of a control flow patter: thunks in combination with generators.
*/

function createTask(target, args) {
	//invoker of Command pattern
	return () => target.apply(null, args);
}

/*added suppoer for undo and serialization*/
//sends status updates to a service
const statusUpdateService = {
	statusUpdates: {},
	sendUpdate: function(status) {
		console.log(`Status sent: ${status}`);
		let id = Math.floor(Math.random() * 1000000);
		statusUpdateService.statusUpdates[id] = status;
		return id;
	}
	destroyUpdate: id => {
		console.log(`Status removed: ${id}`);
		delete statusUpdateService.statusUpdates[id];
	}
};
//Factory for creation of a command representing a status update
function createSendStatusCmd(service, status) {
	let postId = null;
	//triggers sendUpdate. i.e. task pattern
	const command = () => postId = service.sendUpdate(status);
	//attach undo to the task
	command.undo = () => if (postId) {
		service.destroyUpdate(postId);
		postId = null;
	};
	//contains all necessary information to reconstruct the same command object
	command.serialize = () => {type: 'status', action: 'post', status: status};
return command;
}
//Invoker
class Invoker {
	constructor {
		this.history = []
	}
	run(cmd) {
		this.history.push(cmd);
		cmd();
		console.log(`Command executed ${cmd.serialize()}`);
	}
	delay(cmd, delay) {
		setTimeout(() => this.run(cmd), delay);
	}
	undo() {
		const cmd = this.history.pop();
		cmd.undo();
		console.log(`Command undone ${cmd.serialize()}`);
	}
	//run remotely by serializing and transmitting over network
	runRemotely(cmd) {
		request.post(
			'http://localhost:3000/cmd',
			{json: cmd.serialize()},
			res => console.error(`Command ${cmd.serialize()} executed remotely with response: ${res}`)
			);
	}
}
//Client
const invoker = new Invoker();
const command = createSendStatusCmd(statusUpdateService, 'Hello');
//dispatch imidiately
invoker.run(command);
invoker.undo();
//delay
invoker.delay(command, 1000 * 60);
//remote execution
invoker.runRemotely(command);

//Conclusion



