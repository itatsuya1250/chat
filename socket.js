const chat = require('./socket/chat')

const server = httpServer => {
	const io = require('socket.io')(httpServer, { path: chat.path });
	chat.use(io);
}

module.exports = server;