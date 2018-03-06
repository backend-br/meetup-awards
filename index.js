const app = require('express')();
const http = require('http').Server(app)
const Meetup = require('./meetup')

const mt = new Meetup('backendbrasil')

app.get('/', function(req, res){
    mt.getMemberConfirmeds()
	res.sendFile(__dirname + '/index.html');
});

http.listen(3000, () => {
	console.log('Listening local port 3000');
});