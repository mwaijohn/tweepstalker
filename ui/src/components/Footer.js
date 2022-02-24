import React from 'react'

function Footer() {
    const date = new Date();
    return (
        <footer className='flex justify-center bg-gray-50 py-6'>
            <p className='text-lg text-gray-500'>tweepstalker &copy; {date.getFullYear()}</p>
        </footer>
    )
}

export default Footer