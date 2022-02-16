import React from 'react'
import Nav from './Nav'
import Login from './Login'

import StreakLineChart from './StreakLineChart'

function Home({ isLoggedIn }) {
    return (
        <div>
            <Nav />
            <br></br>{
                isLoggedIn ? <main>
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
                    <div className='flex my-3 justify-between m-auto p-3 m-full sm:w-9/12 flex-col'>
                        <h2 className='text-2xl font-bold my-3 text-gray-600'>Tweeting Streak</h2>
                        <StreakLineChart />
                    </div>
                    <div className='flex my-3 justify-between m-auto p-3 w-full sm:w-9/12 flex-col'>
                        <h2 className='text-2xl font-bold my-3 text-gray-600'>Used hashtags</h2>
                        <div className='flex flex-wrap'>
                            <p className='p-2 my-1 mx-1 text-center rounded-full border-solid border-white bg-blue-600 text-white'>#exampletag</p>
                            <p className='p-2 my-1 mx-1 text-center rounded-full border-solid border-white bg-blue-600 text-white'>#exa</p>
                            <p className='p-2 my-1 mx-1 text-center rounded-full border-solid border-white bg-blue-600 text-white'>#exampletag</p>
                            <p className='p-2 my-1 mx-1 text-center rounded-full border-solid border-white bg-blue-600 text-white'>#exampletag</p>
                            <p className='p-2 my-1 mx-1 text-center rounded-full border-solid border-white bg-blue-600 text-white'>#exampletag</p>
                            <p className='p-2 my-1 mx-1 text-center rounded-full border-solid border-white bg-blue-600 text-white'>#exampletag</p>
                            <p className='p-2 my-1 mx-1 text-center rounded-full border-solid border-white bg-blue-600 text-white'>#exampletag</p>
                            <p className='p-2 my-1 mx-1 text-center rounded-full border-solid border-white bg-blue-600 text-white'>#exampletag</p>
                            <p className='p-2 my-1 mx-1 text-center rounded-full border-solid border-white bg-blue-600 text-white'>#exampletag</p>
                            <p className='p-2 my-1 mx-1 text-center rounded-full border-solid border-white bg-blue-600 text-white'>#exampletag</p>
                            <p className='p-2 my-1 mx-1 text-center rounded-full border-solid border-white bg-blue-600 text-white'>#exampletag</p>
                            <p className='p-2 my-1 mx-1 text-center rounded-full border-solid border-white bg-blue-600 text-white'>#exampletag</p>
                            <p className='p-2 my-1 mx-1 text-center rounded-full border-solid border-white bg-blue-600 text-white'>#exampletag</p>
                            <p className='p-2 my-1 mx-1 text-center rounded-full border-solid border-white bg-blue-600 text-white'>#exampletag</p>
                        </div>
                    </div>
                </main> : <Login />
            }
            <footer className='flex justify-center bg-gray-50 py-6'>
                <p className='text-lg text-gray-500'>tweepstalker &copy; 2022</p>
            </footer>
        </div>
    )
}

export default Home