import React, { useEffect, useState } from 'react'
import StatCards from './StatCards'
import StreakLineChart from './StreakLineChart'
import TagsSection from './TagsSection'
import { formatDate, lastSevenDates } from '../utilities';
import axios from 'axios'
import SearchTweep from './SearchTweep';
import {apiPath} from '../utilities'

function UIComponents() {

    const [isLoading, setIsLoading] = useState(false);
    const [userStatuses, setUserStatuses] = useState([]);
    const [replies, setReplies] = useState([])
    const [onlyStatuses, setOnlyStatuses] = useState([])
    const [hashTags, setHashTags] = useState([])
    const [tweetingStreak, setTweetingStreak] = useState([])
    const [screenName, setScreenName] = useState("")

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwtToken')}`;

    const getData = async () => {

        let apiRoute = `${apiPath}/statuses`
        if(screenName != undefined || screenName != ""){
            apiRoute = `${apiPath}/statuses/${screenName}`
        }
        setIsLoading(true)
        await axios.get(apiRoute)
            .then(res => {
                // console.log(res);
                let data = res.data;
                console.log(data)
                const prevDates = lastSevenDates();
                data = data.filter(item => prevDates.includes(formatDate(item.created_at)));

                setUserStatuses(data)
                let replies = [];
                let statuses = [];
                let hashTags = [];

                data.forEach(element => {
                    if (element.in_reply_to_status_id != null) {
                        replies.push(element)
                    } else {
                        statuses.push(element)
                    }
                    const tags = element['entities']['hashtags']
                    tags.forEach(elem => {
                        hashTags.push(elem.text)
                        console.log(elem.text)
                    })
                });

                // generate streak data
                // this gives an object with dates as keys
                const groups = statuses.reduce((groups, element) => {
                    const date = formatDate(element.created_at)
                    if (!groups[date]) {
                        groups[date] = [];
                    }
                    groups[date].push(element);
                    return groups;
                }, {});

                const groupedArrays = Object.keys(groups).map((date) => {
                    return [
                        date,
                        groups[date].length
                    ];
                });

                
                var intersection = groupedArrays.filter(function (e) {
                    return prevDates.indexOf(e[0]) > -1;
                });

                prevDates.forEach((element) => {
                    const result = intersection.find(el => element == el[0])
                    if (!result) {
                        intersection.push([
                            element, 0
                        ])
                    }
                })

                setReplies(replies)
                setOnlyStatuses(statuses)
                const uniqueTags = [...new Set(hashTags)]
                setHashTags(uniqueTags)
                setTweetingStreak(intersection)
                setIsLoading(false)
            }).catch(err => {
                console.log(err)
                setIsLoading(false)
            })
    }

    useEffect(async () => {
          await getData()
    }, []);

    const searchUser = (event) => {
        event.preventDefault()
        console.log(screenName)
        if (screenName === undefined || screenName === "") {
            alert("Enter tweep username")
            return
        }

        getData()
    }


    const getScreenName = (e) => setScreenName(e.target.value)

    return (
        <main className='mt-2'>
            <SearchTweep searchUser={searchUser} getScreenName={getScreenName} />
            <StatCards statuses={onlyStatuses} replies={replies} isLoading={isLoading}/>
            <StreakLineChart streak={tweetingStreak} />
            <TagsSection tags={hashTags} />
        </main>
    )
}

export default UIComponents