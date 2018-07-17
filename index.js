const app = require('express')()
const http = require('http').Server(app)
const Meetup = require('./meetup')
const path = require('path')
const env = require('./env')
const fs = require('fs')
const csv = require('csv')
const mt = new Meetup(env.event_id, env.org, env.key)

const transform = (data) => {
  let results = []

  data.forEach(i => {
    results.push({
      name: i.shift(),
      rg: i.shift()
    })
  })

  return results.map(o => o.name)
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/csv', function (req, res) {
  fs.readFile('./data.csv', (err, file) => {
    if (err) {
      return res.send(JSON.stringify(err)).end()
    }

    csv.parse(file, (err, data) => {
      res.setHeader('Content-Type', 'application/json')
      data = transform(data)
      data = { member: mt.getWinner(data) }
      return res.send(JSON.stringify(data, null, 2)).end()
    })
  })
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
