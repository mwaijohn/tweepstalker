import React, { useState, useEffect } from 'react';
import axios from 'axios'
import queryString from 'query-string';
import Nav from './Nav';
import Footer from './components/Footer';

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [status, setStatus] = useState();
  const [url, setUrl] = useState();

  // const apiPath = process.env.REACT_APP_API_URL
  const apiPath = "http://localhost:3001"
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
          console.error(error);
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

  const logout = () => {
    (async () => {
      try {
        await axios({
          url: `${apiPath}/twitter/logout`,
          method: 'POST'
        });
        setIsLoggedIn(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }
  const login = () => {
    (async () => {

      try {
        //OAuth Step 1
        const response = await axios({
          url: `${apiPath}/twitter/oauth/request_token`,
          method: 'POST'
        });

        const { oauth_token } = response.data;
        //Oauth Step 2
        window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauth_token}`;
      } catch (error) {
        console.error(error);
      }

    })();
  }
  return (
    <React.Fragment>
      <Nav />
      <div className="flex w-full justify-center items-center h-28">
        <img className='signin-btn' onClick={login} alt='Twitter login button' src='https://assets.klaudsol.com/twitter.png' />
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default Login;
