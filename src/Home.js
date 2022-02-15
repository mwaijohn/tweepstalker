import React from 'react'
import Nav from './Nav'
// import StreakBar from './StreakBar'

function Home() {
    return (
        <div>
            <Nav/>
            <br></br>
            <main>
                <form>
                    <input placeholder='Enter Username'></input>
                    <button>Search</button>
                </form>
                <div>
                    <div>
                        <p>215</p>
                        <p>Tweets</p>
                    </div>
                    <div>
                        <p>215</p>
                        <p>Status Retweets</p>
                    </div>
                    <div>
                        <p>215</p>
                        <p>Tweet Likes</p>
                    </div>
                </div>
                <div>
                    <div>
                        <p>215</p>
                        <p>Replies Sent</p>
                    </div>
                    <div>
                        <p>215</p>
                        <p>Replies Received</p>
                    </div>
                    <div>
                        <p>2.0</p>
                        <p>Follow/Follower Ratio</p>
                    </div>
                </div>
                <div>
                    {/* <StreakBar/> */}
                    <div className="chat-notification">
                        <div className="chat-notification-logo-wrapper">
                            <img className="chat-notification-logo" src="/img/logo.svg" alt="ChitChat Logo"/>
                        </div>
                        <div className="chat-notification-content">
                            <h4 className="chat-notification-title">ChitChat</h4>
                            <p className="chat-notification-message">You have a new message!</p>
                        </div>
                    </div>
                    <button className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">Message</button>

                </div>

                <div>
                    <p>#exampletag</p>
                    <p>#exampletag</p>
                    <p>#exampletag</p>
                    <p>#exampletag</p>
                    <p>#exampletag</p>
                    <p>#exampletag</p>
                    <p>#exampletag</p>
                    <p>#exampletag</p>
                </div>
            </main>
        </div>
    )
}

export default Home