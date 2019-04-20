//ticker on ROEE
const Roee = require('./ReadOnly_EventEmitter');

module.exports = function ticker = new Roee(emit => {
	let tickCount = 0;
	setInterval(() => emit('tick', tickCount++), 1000);
});

