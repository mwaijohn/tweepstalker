import React from 'react'
import Nav from './Nav'
import StreakChart from './StreakChart'
// import StreakBar from './StreakBar'


function Home() {
    const state = {
        labels: ['January', 'February', 'March',
            'April', 'May'],
        datasets: [
            {
                label: 'Rainfall',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [65, 59, 80, 81, 56]
            }
        ]
    }
    return (
        <div>
            <Nav />
            <br></br>
            <main>
                <form className='w-full flex flex-wrap justify-center my-2'>
                    <input placeholder='Enter Username' className='text-center w-96 border-2 rounded-full px-2 py-3 hover:border-red'></input>
                    <button className='transition py-2 px-5 font-bold rounded-lg ml-1 bg-green-600 text-white sm:my-2 md:my-2'>Search</button>
                </form>
                <div className='flex my-3 justify-between m-auto p-3 w-9/12'>
                    <div className='max-w-sm rounded overflow-hidden shadow-lg px-2 py-2 text-center w-72 h-24'>
                        <p className='font-bold text-2xl'>100</p>
                        <p>Composed Statuses</p>
                    </div>
                    <div className='max-w-sm rounded overflow-hidden shadow-lg px-2 py-2 text-center w-72 h-24'>
                        <p className='font-bold text-2xl'>1,245</p>
                        <p>Status Retweets</p>
                    </div>
                    <div className='max-w-sm rounded overflow-hidden shadow-lg px-2 py-2 text-center w-72 h-24'>
                        <p className='font-bold text-2xl'>509</p>
                        <p>Status Likes</p>
                    </div>

                </div>
                <div className='flex my-3 justify-between m-auto p-3 w-9/12'>
                    <div className='max-w-sm rounded overflow-hidden shadow-lg px-2 py-2 text-center w-72 h-24'>
                        <p className='font-bold text-2xl'>150</p>
                        <p>Replies Sent</p>
                    </div>
                    <div className='max-w-sm rounded overflow-hidden shadow-lg px-2 py-2 text-center w-72 h-24'>
                        <p className='font-bold text-2xl'>700</p>
                        <p>Replies Received</p>
                    </div>
                    <div className='max-w-sm rounded overflow-hidden shadow-lg px-2 py-2 text-center w-72 h-24'>
                        <p className='font-bold text-2xl'>2.0</p>
                        <p>Follow/Follower Ratio</p>
                    </div>
                </div>
                <div>
                    <StreakChart/>
                    
                </div>
                <div className='flex my-3 justify-between m-auto p-3 w-9/12 flex-col'>
                    <h2 className='text-2xl'>Used hashtags</h2>
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
            </main>
        </div>
    )
}

export default Home