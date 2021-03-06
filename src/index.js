require('dotenv').config()
const config = require('./auth')

const twit = require('twit')
const T = new twit(config)

const tweet = require('./tweet')

const params = {
  q: '@tremBalaBot',
  result_type: 'recent',
  count: 1
};

function seachTwets() {
  T.get('search/tweets', params, (err, data) => {
    let tweets = data.statuses
      if (err) {
        throw new Error(err)
      }
      for (const t of tweets) {
        tweet.replyATweet(T, t)
      }
  })
}

(function start() {
  setInterval(() => {
    seachTwets()  
  }, 8000);
})()