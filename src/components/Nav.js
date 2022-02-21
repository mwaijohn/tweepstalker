import React, { useState, useEffect } from 'react'

function Nav() {

    const [isLoggedIn, setIsLoggedIn] = useState()
    const [user, setUser] = useState(null)
    useEffect(() => {
        const userSource = localStorage.getItem("user")
        if (userSource) {
            const userObj = JSON.parse(userSource)
            setIsLoggedIn(true)
            setUser(userObj)
        } else {
            setIsLoggedIn(false)
        }
    }, [isLoggedIn])
    
    const toggleMenu = () => {
        const btn = document.querySelector("button.mobile-menu-button");
        const menu = document.querySelector(".mobile-menu");

        menu.classList.toggle("hidden");
    }

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between">
                    <div className="flex space-x-7">
                        <div>
                            <a href="#" className="flex items-center py-4 px-2">
                                {/* <img src="logo.png" alt="Logo" className="h-8 w-8 mr-2"/> */}
                                <span className="font-semibold text-gray-500 text-lg">TweepStalker</span>
                            </a>
                        </div>
                        <div className="hidden md:flex items-center space-x-1">
                            <a href="" className="py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold ">Home</a>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center space-x-3 ">
                        {
                            isLoggedIn ? <> <a href="" className="py-2 px-2 font-medium text-gray-500 hover:text-white transition duration-300">{user.name}</a>
                                <img src={user.profile_image_url} alt="Logo" className="h-8 w-8 border mr-2 rounded-full" /></>
                                : <><a href="" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300">Log In</a>
                                    <img src="./img/avatar.png" alt="Logo" className="h-8 w-8 border mr-2 rounded-full" /></>
                        }
                    </div>
                    <div className="md:hidden flex items-center">
                        <button className="outline-none mobile-menu-button" onClick={toggleMenu}>
                            <svg className=" w-6 h-6 text-gray-500 hover:text-green-500 "
                                x-show="!showMenu"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="hidden mobile-menu">
                <ul className="">
                    <li className="active"><a href="index.html" className="block text-sm px-2 py-4 text-white bg-green-500 font-semibold">Home</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav