var request = require('request')

function Meetup (subject) {
    this.KEY = '';
    this.ORG = '';
    this.EVENT_ID = '';
    this.ENDPOINT = 'http://api.meetup.com/';

    this.URL = this.ENDPOINT + this.ORG + '/events/' + this.EVENT_ID + '/rsvps?key=' + this.KEY + '&sign=true';
}

Meetup.prototype.getMemberConfirmeds = function () {
    request(this.URL, function(error, response, body) {
        let members = JSON.parse(body)
        let count = members.length;

        for (i = 0; i <= count; i++) {
            if (i in members) {
                console.log(i, members[i]['response'], members[i]['member']['name'])
            }
        }
    })
}

module.exports = Meetup