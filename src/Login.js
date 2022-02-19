import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Nav from './Nav';
import Footer from './components/Footer';

function Login() {
  const apiPath = "http://localhost:3001"

  const logout = () => {
    (async () => {
      try {
        await axios({
          url: `${apiPath}/twitter/logout`,
          method: 'POST'
        });
        // setIsLoggedIn(false);
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
