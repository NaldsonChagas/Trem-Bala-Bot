const fs = require('fs');
const mediaSelector = require('./mediaSelector');

let lastTweetsReplied = []

function addTweetOnHistory(tweet) {
  lastTweetsReplied.push(tweet)
  if (lastTweetsReplied.length === 3) {
    lastTweetsReplied = lastTweetsReplied.filter((t, index) => {
      if (index !== 0) return t
    })
  }
}

function canReplyThisTweet(tweet) {
  const x = lastTweetsReplied.filter(t => {
    if (t.id === tweet.id) return t
  })

  return x.length === 0
}

module.exports = {
  replyATweet(twit, tweet) {
    const { file, type } = mediaSelector.selector(tweet.text)

    var b64content = fs.readFileSync(file, { encoding: 'base64' })

    const res = {
      media_data: b64content,
    };

    if (canReplyThisTweet(tweet)) {
      if (type === 'jpeg') {
        twit.post('media/upload', res, (err, data) => {
          if (err) throw new Error(err)
          
          const mediaIdStr = data.media_id_string
          const altText = "Github: NaldsonChagas"
          const metaParams = { media_id: mediaIdStr, alt_text: { text: altText } }
        
          twit.post('media/metadata/create', metaParams, function (err, data, response) {
            if (!err) {
              var params = { 
                status: `Olha o deeeedo @${tweet.user.screen_name} #TremBalaBot`, 
                in_reply_to_status_id: '' + tweet.id_str,
                media_ids: [mediaIdStr],
              }         
              console.log('respondendo esse tweet', tweet.id_str)
              twit.post('statuses/update', params, function (err, data, response) {
                addTweetOnHistory(tweet)
              })
            }
          })
        });
      } else {
        twit.postMediaChunked({ file_path: file }, (err, data, response) => {
          const mediaIdStr = data.media_id_string
          const altText = "Github: NaldsonChagas"
          const metaParams = { media_id: mediaIdStr, alt_text: { text: altText } }

          twit.post('media/metadata/create', metaParams, function (err, data, response) {
            if (!err) {
              var params = { 
                status: `Olha o deeeedo @${tweet.user.screen_name} #TremBalaBot`, 
                in_reply_to_status_id: '' + tweet.id_str,
                media_ids: [mediaIdStr],
              }         
              console.log('respondendo esse tweet', tweet.id_str)
              twit.post('statuses/update', params, function (err, data, response) {
                addTweetOnHistory(tweet)
              })
            }
          })
        })
      }
    } else {
      console.log('Tweet já respondido')
    }
  }
}