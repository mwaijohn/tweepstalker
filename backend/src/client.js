const { dayBeforeSevenDays, lastSevenDates, formatDate, dateToTimestamp } = require('../utilities')

const getStatuses = async (screen_name, twitterClient) => {

    const sevenDates = lastSevenDates();
    const dateTo = dayBeforeSevenDays();

    let tweetDate = sevenDates[sevenDates.length - 1]
    let dataArray = []

    console.log(dateTo, tweetDate)

    while (dateTo != tweetDate) {
        console.log("sleep")
        let max_id = null
        let payload = {}

        try {
            if (max_id == null) {
                payload = { "screen_name": screen_name, "include_rts": false, "count": 200 }
            } else {
                payload = { "screen_name": screen_name, "include_rts": false, "max_id": max_id, "count": 200 }
            }
            var statuses = await twitterClient.tweets.statusesUserTimeline(payload)
            // console.log(statuses)
            try {

                if (max_id == statuses[(statuses.length - 1)]['id']) {
                    break
                } else {
                    max_id = statuses[(statuses.length - 1)]['id']
                    tweetDate = formatDate(statuses[(statuses.length - 1)]['created_at'])
                }

                console.log(statuses.length)
                console.log(max_id)
                console.log(tweetDate)
                dataArray.unshift(...statuses)

                if (dateToTimestamp(tweetDate) < dateToTimestamp(sevenDates[0])) {
                    break
                }

            } catch (error) {
                console.log("Error: ", error)
                break
            }
        } catch (error) {
            console.log("API Error: ", error)
            // return dataArray;
            break
        }
    }

    return dataArray
}


module.exports = getStatuses
