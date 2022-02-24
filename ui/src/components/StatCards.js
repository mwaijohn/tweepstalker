import React, { useState, useEffect } from 'react'
import { numberFormatterLikeTwitter } from '../utilities'

function StatCards({ statuses, replies, isLoading }) {
    console.log(statuses)
    const [composedStatusesCount, setComposedStatusesCount] = useState();
    const [statusRetweets, setStatusRetweets] = useState();
    const [statusLikes, setStatusLikes] = useState();
    const [sentReplies, setSentReplies] = useState();
    const [followRatio, setFollowRatio] = useState();

    useEffect(() => {
        let retweetSum = 0;
        let likesSum = 0;
        statuses.forEach(item => {
            retweetSum += item.retweet_count
            likesSum += item.favorite_count
        })

        let follwerRatio = 0;
        if (statuses.length > 0) {
            const followersCount = statuses[0].user.followers_count;
            const followingCount = statuses[0]['user']['friends_count'];
            console.log(followersCount, followingCount)
            follwerRatio = followersCount / followingCount;
        }

        setStatusRetweets(numberFormatterLikeTwitter(retweetSum))
        setStatusLikes(numberFormatterLikeTwitter(likesSum))
        setComposedStatusesCount(numberFormatterLikeTwitter(statuses.length))
        setFollowRatio(follwerRatio.toFixed(2))
        setSentReplies(numberFormatterLikeTwitter(replies.length))
    }, [statuses])

    return (
        <React.Fragment>
            {
                isLoading && <div className='flex m-auto p-3 w-full sm:w-9/12 justify-center'>
                    <div className="h-6 w-6 border-b-2 border-gray-900 rounded-full animate-spin inline-block"></div>
                </div>
            }
            <div className='grid m-auto p-3 w-full sm:w-9/12'>
                <p className='text-2xl font-bold my-3 text-gray-600'>Engagement Stats(Last Seven Days)</p>
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
                    <p className='font-bold text-2xl'>{followRatio}</p>
                    <p>Follow/Follower Ratio</p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default StatCards