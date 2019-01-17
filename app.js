const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;
require('date-utils');

var userCnt = 0;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res) {
	if (req.body['command'] == 'getUserId') {
		userCnt++;
		res.json({
			userId: 'user' + userCnt
		});
	}
});

io.on('connection', function (socket) {
	console.log('connection')
	socket.on('chat message', function (obj) {
		obj.date = new Date().toFormat("HH24:MI");
		io.emit('chat message', obj);
		console.log('user:' + obj.user + ',date:' + obj.date + ',msg:' + obj.msg);
	});
});

http.listen(PORT, function () {
	console.log(`listening on *:${PORT}`);
});