const app = require('express')();
const http = require('http').Server(app)
const Meetup = require('./meetup')

const mt = new Meetup('backendbrasil')

mt.getConfirmedMembers();

app.get('/', function(req, res){    
	res.sendFile(__dirname + '/public/index.html');
});

http.listen(3000, () => {
	console.log('Listening local port 3000');
});