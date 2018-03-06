const Meetup = require('./meetup')
const mt = new Meetup('backendbrasil')

mt.getConfirmedMembers()
  .then(mt.sort)
  .then(console.log)
  .catch(console.error)
