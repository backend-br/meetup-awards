var Twit = require('twit')

function Twitter (subject) {
  this.ENV = {
    'CONSUMER_KEY': '',
    'CONSUMER_SECRET': '',
    'ACCESS_KEY': '',
    'ACCESS_SECRET': ''
  }

  this.T = new Twit({
    consumer_key: this.ENV.CONSUMER_KEY,
    consumer_secret: this.ENV.CONSUMER_SECRET,
    access_token: this.ENV.ACCESS_KEY,
    access_token_secret: this.ENV.ACCESS_SECRET,
    timeout_ms: 60 * 1000
  })
}

Twitter.prototype.getPostAbout = function () {
  this.T.get('search/tweets', { q: '#backendbrasil since:2018-03-04', count: 100 }, function (err, data, response) {
    if (err) {
      return err
    }

    let users = []
    let tweet

    for (tweet in data['statuses']) {
      let idUser = data['statuses'][tweet]['user']['id']

      users.push({idUser})
    }

    console.log(users)
  })
}

module.exports = Twitter
