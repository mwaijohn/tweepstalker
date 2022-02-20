import React from 'react'

function TagsSection({ tags }) {
    // console.log(tags)
    return (
        <div className='flex my-3 justify-between m-auto p-3 w-full sm:w-9/12 flex-col'>
            <h2 className='text-2xl font-bold my-3 text-gray-600'>Used hashtags</h2>
            <div className='flex flex-wrap'>
                {
                    tags.map(el => <p key={el} className='p-2 my-1 mx-1 text-center rounded-full border-solid border-white bg-blue-600 text-white'>#{el}</p>)
                }
            </div>
        </div>
    )
}

export default TagsSection