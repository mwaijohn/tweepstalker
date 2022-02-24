const getStatuses = async (screen_name, twitterClient) => {

    let dataArray = []
    let max_id = null
    let payload = {}

    try {
        for (var i = 1; i > 0; i--) {
            //get user time line
            if (max_id == null) {
                payload = { "screen_name": screen_name, "include_rts": false, "count":200 }
            } else {
                payload = { "screen_name": screen_name, "include_rts": false, "max_id": max_id,"count":200 }
            }
            var statuses = await twitterClient.tweets.statusesUserTimeline(payload)
          
            max_id = statuses[(statuses.length - 1)]['id']


            console.log(max_id)
            dataArray.unshift(...statuses)
        }
    } catch (error) {
        console.log("API Error: ",error)
        return dataArray;
    }

    return dataArray
}


module.exports = getStatuses
