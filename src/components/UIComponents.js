import React, { useEffect, useState } from 'react'
import StatCards from './StatCards'
import StreakLineChart from './StreakLineChart'
import TagsSection from './TagsSection'

import axios from 'axios'

function UIComponents() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwtToken')}`;
    // const apiPath = process.env.REACT_APP_API_URL
    const apiPath = "http://localhost:3001"

    useEffect(async () => {
        console.log(apiPath)
        axios.get(`${apiPath}/statuses`)
            .then(res => {
                console.log(res);
                console.log(res.data);
            }).catch(err => {
                console.log(err)
            })
    }, []);
    return (
        <main>
            <StatCards />
            <StreakLineChart />
            <TagsSection />
        </main>
    )
}

export default UIComponents