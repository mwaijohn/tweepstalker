import React, { useState, useEffect } from 'react'

function Nav({login}) {
    const [showSignOut, setShowSignOut] = useState(false)
    const [authed, setAuthed] = useState()
    const [user, setUser] = useState()

    useEffect(() => {
        const userSource = localStorage.getItem("user")
        if (userSource) {
            const userObj = JSON.parse(userSource)
            setAuthed(true)
            setUser(userObj)
        } else {
            setAuthed(false)
        }
    }, [authed])

    const logout = () => {
        localStorage.clear()
        // navigate("http://localhost:3000/")
        window.location = "/"
    }

    const toggleMenu = () => {
        const menu = document.querySelector(".mobile-menu");
        menu.classList.toggle("hidden");
    }

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between">
                    <div className="flex space-x-7">
                        <div>
                            <a href="/" className="flex items-center py-4 px-2">
                                <span className="font-semibold text-gray-500 text-lg">TweepStalker</span>
                            </a>
                        </div>
                        <div className="hidden md:flex items-center space-x-1">
                            <a href="/" className="py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold ">Home</a>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center space-x-3 ">
                        {
                            authed ? <> <a className="py-2 px-2 font-medium text-gray-500 transition duration-300">{user.name}</a>
                                <button type="button" data-modal-toggle="small-modal" onClick={() => setShowSignOut(!showSignOut)}>
                                    <span className="sr-only">Open user menu</span>
                                    <img src={user.profile_image_url} alt="Logo" className="h-8 w-8 border mr-2 rounded-full" />
                                </button>
                                {
                                    showSignOut && <DropDown logout={logout} />
                                }
                            </>
                                : <><a onClick={login} className="py-2 px-2 font-medium text-gray-500 rounded transition duration-300">Log In</a>
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
                    {
                        authed && <li className="active"><a href="index.html" className="block text-sm px-2 py-4 text-white bg-green-500 font-semibold" onClick={logout}>Sign Out</a></li>
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Nav


export const DropDown = ({ logout }) => {
    return (
        <div className='origin-top-right absolute right-0 top-16
         w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <a className="block px-4 py-2 text-sm text-gray-700 cursor-pointer" role="menuitem" onClick={logout}>Sign Out</a>
        </div>
    )
}
