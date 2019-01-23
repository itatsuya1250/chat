require('date-utils');

const chat = {
	path: '/chat',
	use(io) {
		io.on('connection', (socket) => {
			console.log('socket connected');
			socket.on('disconnect', (reason) => {
				console.log('socket disconnected : ' + reason);
			});
			socket.on('msg', (data) => {
				data.date = new Date().toFormat("HH24:MI");
				console.log(data);
				io.emit('msg', data);
			});

		});
		let timer = setInterval(() => {
			let now = new Date();
			io.emit('time', { msg: now.toLocaleString() });
		}, 1000)
	}
	
}

module.exports = chat;