const Twitter = require('./twitter')
const Meetup = require('./meetup')

// const tt = new Twitter('backendbrasil')
const mt = new Meetup('backendbrasil')

// console.log(tt.getPostAbout())
console.log(mt.getMemberConfirmeds())