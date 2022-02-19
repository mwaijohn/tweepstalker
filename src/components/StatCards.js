import React, { useState, useEffect } from 'react'
import {numberFormatterLikeTwitter} from '../utilities'

function StatCards({ statuses, replies }) {
    console.log(statuses)
    const [composedStatusesCount, setComposedStatusesCount] = useState();
    const [statusRetweets, setStatusRetweets] = useState();
    const [statusLikes, setStatusLikes] = useState();
    const [sentReplies, setSentReplies] = useState();
    const [receivedReplies, setReceivedReplies] = useState();
    const [followRatio, setFollowRatio] = useState();

    useEffect(() => {
        let retweetSum = 0;
        let likesSum = 0;
        statuses.forEach(item => {
            retweetSum += item.retweet_count
            likesSum += item.favorite_count
        })

        let follwerRatio = 0;
        if(statuses.length > 0){
            const followersCount = statuses[0].user.followers_count;
            const followingCount = statuses[0]['user']['friends_count'];
            console.log(followersCount,followingCount)
            follwerRatio = followersCount/followingCount;
        }

        setStatusRetweets(numberFormatterLikeTwitter(retweetSum))
        setStatusLikes(numberFormatterLikeTwitter(likesSum))
        setComposedStatusesCount(statuses.length)
        setFollowRatio(follwerRatio.toFixed(2))
        setSentReplies(numberFormatterLikeTwitter(replies.length))
    }, [followRatio])
    return (
        <React.Fragment>
            <form className='w-full flex flex-wrap justify-center my-2'>
                <input placeholder='Enter Username' className='text-center w-96 border-2 rounded-full px-2 py-3'></input>
                <button className='transition py-2 px-5 font-bold rounded-lg ml-1 bg-green-600 text-white my-1 sm:my-3'>Search</button>
            </form>
            <div className='grid grid-cols-1 sm:grid-cols-3 m-auto p-3 w-full sm:w-9/12 gap-3 '>
                <h2 className='text-2xl font-bold my-3 text-gray-600'>Engagement Stats</h2>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 m-auto p-3 w-full sm:w-9/12 gap-3 '>
                <div className='max-w-sm rounded overflow-hidden shadow-lg px-2 py-2 text-center h-24 flex flex-col justify-center'>
                    <p className='font-bold text-2xl'>{composedStatusesCount}</p>
                    <p>Composed Statuses</p>
                </div>
                <div className='max-w-sm rounded overflow-hidden shadow-lg px-2 py-2 text-center h-24 flex flex-col justify-center'>
                    <p className='font-bold text-2xl'>{statusRetweets}</p>
                    <p>Status Retweets</p>
                </div>
                <div className='max-w-sm rounded overflow-hidden shadow-lg px-2 py-2 text-center h-24 flex flex-col justify-center'>
                    <p className='font-bold text-2xl'>{statusLikes}</p>
                    <p>Status Likes</p>
                </div>
                <div className='max-w-sm rounded overflow-hidden shadow-lg px-2 py-2 text-center h-24 flex flex-col justify-center'>
                    <p className='font-bold text-2xl'>{sentReplies}</p>
                    <p>Replies Sent</p>
                </div>
                <div className='max-w-sm rounded overflow-hidden shadow-lg px-2 py-2 text-center h-24 flex flex-col justify-center'>
                    <p className='font-bold text-2xl'>700</p>
                    <p>Replies Received</p>
                </div>
                <div className='max-w-sm rounded overflow-hidden shadow-lg px-2 py-2 text-center h-24 flex flex-col justify-center'>
                    <p className='font-bold text-2xl'>{followRatio}</p>
                    <p>Follow/Follower Ratio</p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default StatCards