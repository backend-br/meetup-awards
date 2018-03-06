const request = require('request-promise-native')
const env = require('./env.json')

/**
 * Meetup.com API
 * @returns {object} instance of itself
 */
function Meetup () {
  this.KEY = env.key || ''
  this.ORG = 'BackEndBr'
  this.EVENT_ID = '247616504'
  this.ENDPOINT = 'http://api.meetup.com/'

  this.URL = this.ENDPOINT + this.ORG + '/events/' + this.EVENT_ID + '/rsvps?key=' + this.KEY + '&sign=true'
}

/**
 * Get confirmed members
 * @throws {Error} if could not complete request
 * @returns {array} with member names
 */
Meetup.prototype.getConfirmedMembers = async function () {
  const response = await request({ uri: this.URL, json: true })
  let membersSort = []

  for (let i = 0; i <= response.length; i++) {
    if (i in response) {
      if (response[i]['response'] === 'yes') {
        membersSort.push(response[i]['member']['name'])
      }
    }
  }

  return membersSort
}

/**
 * Sorts an array and returns a name
 * @param {array} list - array to be sorted
 * @returns {string} a random item from array
 */
Meetup.prototype.sort = function (list) {
  return list[Math.floor(Math.random() * list.length)]
}

module.exports = Meetup
