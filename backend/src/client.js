var fs = require('fs')
var twitterClient = require('./twitterclient.js')

const getStatuses = async (screen_name) => {

    let dataArray = []
    let max_id = null
    let payload = {}

    try {
        for (var i = 6; i > 0; i--) {
            //get user time line
            if (max_id == null) {
                payload = { "screen_name": screen_name, "include_rts": false }
            } else {
                payload = { "screen_name": screen_name, "include_rts": false, "max_id": max_id }
            }
            var statuses = await twitterClient.tweets.statusesUserTimeline(payload)
            max_id = statuses[(statuses.length - 1)]['id']

            console.log(max_id)
            dataArray.unshift(...statuses)
        }
    } catch (error) {
        console.log(error)
    }


    // fs.writeFile('db.json', JSON.stringify(dataArray), function (err) {
    //     if (err) return console.log(err);
    //     console.log('Note added',dataArray.length);
    // });

    return dataArray
}

module.exports = getStatuses
