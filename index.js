const app = require('express')()
const http = require('http').Server(app)
const Meetup = require('./meetup')
const path = require('path')
const env = require('./env')
const mt = new Meetup(env.event_id, env.org, env.key)

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/win', function (req, res) {
  const result = async () => {
    let confirmedMembers = await mt.getConfirmedMembers()

    return mt.getWinner(confirmedMembers)
  }

  res.setHeader('Content-Type', 'application/json')

  result()
    .then(winner => res.end(JSON.stringify({ member: winner })))
    .catch(e => res.end(JSON.stringify({ message: e.message, name: e.name })))
})

http.listen(3000, () => {
  console.log('Listening local port 3000')
})
