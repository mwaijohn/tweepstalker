import React from 'react'
import Footer from './Footer'
import Nav from './Nav'

function FourOFour() {
    return (
        <React.Fragment>
            <Nav/>
            <div className="flex items-center justify-center bg-gradient-to-r from-green-400 to-green-800">
                <div className="px-40 py-20 bg-white rounded-md shadow-xl my-2 mx-4 sm:mx-0">
                    <div className="flex flex-col items-center">
                        <h1 className="font-bold text-blue-600 text-9xl">404</h1>

                        <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                            <span className="text-red-500">Oops!</span> Page not found
                        </h6>

                        <p className="mb-8 text-center text-gray-500 md:text-lg">
                            The page you’re looking for doesn’t exist.
                        </p>

                        <a href="/" className="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100">Go home</a>
                    </div>
                </div>
            </div>
            <Footer/>
        </React.Fragment>
    )
}

export default FourOFour