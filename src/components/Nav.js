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
                                <span className="font-semibold text-gray-500 text-lg">TweepStalker</span>
                            </a>
                        </div>
                        <div className="hidden md:flex items-center space-x-1">
                            <a href="" className="py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold ">Home</a>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center space-x-3 ">
                        {
                            isLoggedIn ? <> <a href="" className="py-2 px-2 font-medium text-gray-500 transition duration-300">{user.name}</a>
                                <button type="button" data-modal-toggle="small-modal">
                                    <span class="sr-only">Open user menu</span>
                                    <img src={user.profile_image_url} alt="Logo" className="h-8 w-8 border mr-2 rounded-full" />
                                </button>
                                <DropDown/>
                            </>
                                : <><a href="" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 transition duration-300">Log In</a>
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

export const DropDown = () => {
    return (
        <React.Fragment>
            <div class="hidden overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center md:inset-0 h-modal sm:h-full" id="small-modal">

            {/* <div class="hidden overflow-y-auto overflow-x-hidden origin-top-right absolute right-0 top-14  mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none h-modal" id="small-modal"> */}
                <a class="block px-4 py-2 text-sm text-gray-700 cursor-pointer" id="headlessui-menu-item-62" role="menuitem" tabindex="-1">Dashboard</a>
                <a class="block px-4 py-2 text-sm text-gray-700 cursor-pointer" id="headlessui-menu-item-63" role="menuitem" tabindex="-1">Welcome Page</a>
                <a class="block px-4 py-2 text-sm text-gray-700 cursor-pointer" id="headlessui-menu-item-64" role="menuitem" tabindex="-1">Referral Code</a>
                <a class="block px-4 py-2 text-sm text-gray-700 cursor-pointer" id="headlessui-menu-item-65" role="menuitem" tabindex="-1">Create Login Code</a>
                <a class="block px-4 py-2 text-sm text-gray-700 cursor-pointer" id="headlessui-menu-item-66" role="menuitem" tabindex="-1">Manage Subscription</a>
                <a class="block px-4 py-2 text-sm text-gray-700 cursor-pointer" id="headlessui-menu-item-67" role="menuitem" tabindex="-1">Manage Account</a>
                <a class="block px-4 py-2 text-sm text-gray-700 cursor-pointer" id="headlessui-menu-item-68" role="menuitem" tabindex="-1">Sign Out</a>
            </div>
        </React.Fragment>

    )
}
