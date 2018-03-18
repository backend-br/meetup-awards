const axios = require('axios')

/**
 * Meetup.com API
 * @returns {object} instance of itself
 */
function Meetup (eventId, orgName, key) {
  this.key = key
  this.org = orgName
  this.event_id = eventId
  this.endpoint = 'http://api.meetup.com/'

  this.url = `${this.endpoint}${this.org}/events/${this.event_id}/rsvps?key=${this.key}&sign=true`
}

/**
 * Get confirmed members
 * @throws {Error} if could not complete request
 * @returns {array} with member names
 */
Meetup.prototype.getConfirmedMembers = async function () {
  let response = await axios.get(this.url)
  let confirmedMembers = []

  if (response.status !== 200) {
    throw new Error('Could not complete request!')
  }

  for (let i = 0; i <= response.data.length; i++) {
    if (i in response.data) {
      if (response.data[i]['response'] === 'yes') {
        confirmedMembers.push(response.data[i]['member']['name'])
      }
    }
  }

  return confirmedMembers
}

/**
 * getWinner returns a winner
 * @param {array} list - array to be sorted
 * @returns {string} a random item from array
 */
Meetup.prototype.getWinner = function (list) {
  const index = Math.floor(Math.random() * list.length)
  return list[index] || ''
}

module.exports = Meetup
