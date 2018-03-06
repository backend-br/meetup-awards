var request = require('request')

function Meetup (subject) {
    this.KEY = '';
    this.ORG = 'BackEndBr';
    this.EVENT_ID = '247616504';
    this.ENDPOINT = 'http://api.meetup.com/';

    this.URL = this.ENDPOINT + this.ORG + '/events/' + this.EVENT_ID + '/rsvps?key=' + this.KEY + '&sign=true';
}

Meetup.prototype.getMemberConfirmeds = function () {
    request(this.URL, function(error, response, body) {
        let members = JSON.parse(body)
        let count = members.length
        let countMembersConfirmed = 0
        let membersSort = []

        for (i = 0; i <= count; i++) {
            if (i in members) {
                if (members[i]['response'] == 'yes') {
                    countMembersConfirmed++;
                    
                    membersSort.push(members[i]['member']['name'])
                }
            }
        }

        console.log(membersSort[Math.floor(Math.random() * membersSort.length)])
    })
}

module.exports = Meetup