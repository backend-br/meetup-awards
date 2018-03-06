const Twitter = require('./twitter')
const Meetup = require('./meetup')

// const tt = new Twitter('backendbrasil')
const mt = new Meetup('backendbrasil')

// console.log(tt.getPostAbout())
memberWin = mt.getMemberConfirmeds()

console.log(memberWin)