import React, { useEffect, useState } from 'react'
import StatCards from './StatCards'
import StreakLineChart from './StreakLineChart'
import TagsSection from './TagsSection'
import queryString from 'query-string';
import { formatDate, lastSevenDates } from '../utilities';
import axios from 'axios'
import SearchTweep from './SearchTweep';

function UIComponents() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [name, setName] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [status, setStatus] = useState();
    const [userStatuses, setUserStatuses] = useState([]);
    const [replies, setReplies] = useState([])
    const [onlyStatuses, setOnlyStatuses] = useState([])
    const [hashTags, setHashTags] = useState([])
    const [tweetingStreak, setTweetingStreak] = useState([])
    const [screenName, setScreenName] = useState("")

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwtToken')}`;
    // const apiPath = process.env.REACT_APP_API_URL
    const apiPath = "http://localhost:3001/api"

    const getData = async () => {

        let apiRoute = `${apiPath}/statuses`
        if(screenName != undefined || screenName != ""){
            apiRoute = `${apiPath}/statuses/${screenName}`
        }
        
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

                
                console.log("groups", groups)
                console.log("groupedArray", groupedArrays)
                console.log("groupedArrayIntersection", intersection)


                setReplies(replies)
                console.log(replies)
                setOnlyStatuses(statuses)
                console.log(statuses)
                setHashTags(hashTags)
                setTweetingStreak(intersection)

                console.log(hashTags)

            }).catch(err => {
                console.log(err)
            })
    }

    useEffect(async () => {
          await getData()
    }, []);

    useEffect(() => {
        (async () => {
            const { oauth_token, oauth_verifier } = queryString.parse(window.location.search);

            if (oauth_token && oauth_verifier) {
                try {
                    //Oauth Step 3
                    let response = await axios({
                        url: `${apiPath}/twitter/oauth/access_token`,
                        method: 'POST',
                        data: { oauth_token, oauth_verifier }
                    });

                    let data = response.data
                    localStorage.setItem("jwtToken", data.accessToken)
                    localStorage.setItem("refreshToken", data.accessToken)
                    localStorage.setItem("user", JSON.parse(data.user))

                    window.location = "/"

                } catch (error) {
                    console.log(oauth_token, oauth_verifier)
                    console.error(error, "jhjhjjh");
                }
            }

            // try {

            //     const access_token = localStorage.getItem('jwtToken')
            //     axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
            //     //Authenticated Resource Access
            //     const { data: { name, profile_image_url_https, status, entities } } = await axios({
            //         url: `${apiPath}/twitter/users/profile_banner`,
            //         method: 'GET'
            //     });

            //     setIsLoggedIn(true);
            //     setName(name);
            //     setImageUrl(profile_image_url_https);
            //     setStatus(status.text);
            //     //setUrl(entities.url.urls[0].expanded_url);
            // } catch (error) {
            //     console.error(error);
            // }
        })();
    }, [])

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
        <main>
            <SearchTweep searchUser={searchUser} getScreenName={getScreenName} />
            <StatCards statuses={onlyStatuses} replies={replies} />
            <StreakLineChart streak={tweetingStreak} />
            <TagsSection tags={hashTags} />
        </main>
    )
}

export default UIComponents