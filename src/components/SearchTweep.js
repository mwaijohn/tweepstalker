import React from 'react'

function SearchTweep({getScreenName,searchUser}) {
    
    return (
        <React.Fragment>
            <form className='w-full flex flex-wrap justify-center my-2' onSubmit={searchUser} >
                <input onChange={getScreenName} placeholder='Enter Username' className='text-center w-96 border-2 rounded-full px-2 py-3'></input>
                <button className='transition py-2 px-5 font-bold rounded-lg ml-1 bg-green-600 text-white my-1 sm:my-3'>Search</button>
            </form>
        </React.Fragment>
    )
}

export default SearchTweep