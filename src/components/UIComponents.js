import React, { useEffect, useState } from 'react'
import StatCards from './StatCards'
import StreakLineChart from './StreakLineChart'
import TagsSection from './TagsSection'
import queryString from 'query-string';

import axios from 'axios'

function UIComponents() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [name, setName] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [status, setStatus] = useState();
    const [url, setUrl] = useState();

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

    // const apiPath = process.env.REACT_APP_API_URL
    // const apiPath = "http://localhost:3001"
    useEffect(() => {
        (async () => {
            const { oauth_token, oauth_verifier } = queryString.parse(window.location.search);

            if (oauth_token && oauth_verifier) {
                try {
                    //Oauth Step 3
                    let response = await axios({
                        url: `${apiPath}/twitter/oauth/access_token`,
                        method: 'POST',
                        data: { oauth_token, oauth_verifier }
                    });

                    let data = response.data
                    localStorage.setItem("jwtToken", data.accessToken)
                    localStorage.setItem("refreshToken", data.accessToken)
                    localStorage.setItem("user", JSON.parse(data.user))

                    window.location = "/"

                } catch (error) {
                    console.log(oauth_token,oauth_verifier)
                    console.error(error,"jhjhjjh");
                }
            }

            try {

                const access_token = localStorage.getItem('jwtToken')
                axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
                //Authenticated Resource Access
                const { data: { name, profile_image_url_https, status, entities } } = await axios({
                    url: `${apiPath}/twitter/users/profile_banner`,
                    method: 'GET'
                });

                setIsLoggedIn(true);
                setName(name);
                setImageUrl(profile_image_url_https);
                setStatus(status.text);
                //setUrl(entities.url.urls[0].expanded_url);
            } catch (error) {
                console.error(error);
            }

            try {
                const access_token = localStorage.getItem('jwtToken')
                axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
                //Authenticated Resource Access
                const data = await axios({
                    url: `${apiPath}/statuses`,
                    method: 'GET'
                });
                console.log(data)
            } catch (error) {
                console.error(error);
            }

        })();
    }, [])

    return (
        <main>
            <StatCards />
            <StreakLineChart />
            <TagsSection />
        </main>
    )
}

export default UIComponents