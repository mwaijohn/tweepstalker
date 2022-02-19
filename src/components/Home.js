import React from 'react'
import Nav from './Nav'

import UIComponents from './UIComponents'
import Footer from './Footer'

function Home() {
    return (
        <React.Fragment>
            <Nav />
            <br></br>
            <UIComponents />
            <Footer/>
        </React.Fragment>
    )
}

export default Home