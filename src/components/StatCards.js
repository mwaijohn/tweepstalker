import React from 'react'

function StatCards({statuses,replies}) {
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
                    <p className='font-bold text-2xl'>100</p>
                    <p>Composed Statuses</p>
                </div>
                <div className='max-w-sm rounded overflow-hidden shadow-lg px-2 py-2 text-center h-24 flex flex-col justify-center'>
                    <p className='font-bold text-2xl'>1,245</p>
                    <p>Status Retweets</p>
                </div>
                <div className='max-w-sm rounded overflow-hidden shadow-lg px-2 py-2 text-center h-24 flex flex-col justify-center'>
                    <p className='font-bold text-2xl'>509</p>
                    <p>Status Likes</p>
                </div>
                <div className='max-w-sm rounded overflow-hidden shadow-lg px-2 py-2 text-center h-24 flex flex-col justify-center'>
                    <p className='font-bold text-2xl'>150</p>
                    <p>Replies Sent</p>
                </div>
                <div className='max-w-sm rounded overflow-hidden shadow-lg px-2 py-2 text-center h-24 flex flex-col justify-center'>
                    <p className='font-bold text-2xl'>700</p>
                    <p>Replies Received</p>
                </div>
                <div className='max-w-sm rounded overflow-hidden shadow-lg px-2 py-2 text-center h-24 flex flex-col justify-center'>
                    <p className='font-bold text-2xl'>2.0</p>
                    <p>Follow/Follower Ratio</p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default StatCards