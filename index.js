const app = require('express')();
const http = require('http').Server(app)
const Meetup = require('./meetup')
const request = require('request-promise-native')

const mt = new Meetup('backendbrasil')

app.get('/', function(req, res) { 
	res.sendFile(__dirname + '/public/index.html');
});

app.get('/win', function(req, res) {
	const response = request({ uri: mt.URL, json: true }).then(function(response) {
		let membersSort = []

		for (let i = 0; i <= response.length; i++) {
			if (i in response) {
				if (response[i]['response'] === 'yes') {
					membersSort.push(response[i]['member']['name'])
				}
			}
		}
		
		member = membersSort[Math.floor(Math.random() * membersSort.length)]
		
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify({ member: member }));
	})
})

http.listen(3000, () => {
	console.log('Listening local port 3000');
});