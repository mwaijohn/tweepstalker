const getStatuses = async (screen_name, twitterClient) => {

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
        console.log("API Error: ",error)
    }


    // fs.writeFile('db.json', JSON.stringify(dataArray), function (err) {
    //     if (err) return console.log(err);
    //     console.log('Note added',dataArray.length);
    // });
    // console.log(JSON.stringify(dataArray))
    return dataArray
}

// var twitterClient = require('./twitterclient')

// var client = twitterClient("jhjhj","jhjhjhj")

// getStatuses("mjohn_5",client)

module.exports = getStatuses
