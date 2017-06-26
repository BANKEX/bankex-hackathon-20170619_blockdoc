'use strict';

const http = require('http');
const express = require('express');
const app = express();


app.disable('x-powered-by');

app.use('/', express.static('public/app'));


let port = 8080;
let server = http.createServer(app);
server.listen(port, function(){
	console.log('HTTP server listening on port ' + port );
});

var io = require('socket.io')(server);

io.on('connection', socket => {
	
	socket.on('test', (data) => {
		console.log(JSON.stringify(data));
		socket.emit('test-test', 'OK');
	});
});
