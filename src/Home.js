import React from 'react'
import Nav from './Nav'
import Login from './Login'

import StreakLineChart from './components/StreakLineChart'
import StatCards from './components/StatCards'
import TagsSection from './components/TagsSection'
import UIComponents from './components/UIComponents'
import Footer from './components/Footer'

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