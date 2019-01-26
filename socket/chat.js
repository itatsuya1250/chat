require('date-utils');
process.env.TZ = "Asia/Tokyo";

const chat = {
	path: '/chat',
	use(io) {
		io.on('connection', (socket) => {
			console.log('socket connected');
			socket.on('disconnect', (reason) => {
				console.log('socket disconnected : ' + reason);
			});
			socket.on('msg', (data) => {
				let jsonObj = JSON.parse(data);
				jsonObj.date = new Date().toFormat("HH24:MI");
				io.emit('msg', JSON.stringify(jsonObj));
			});

		});
		// let timer = setInterval(() => {
		// 	let now = new Date();
		// 	let json = { msg: now.toLocaleString() }
		// 	io.emit('time', JSON.stringify(json));
		// }, 1000)
	}
	
}

module.exports = chat;