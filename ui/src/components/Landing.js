import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Nav from './Nav';
import Footer from './Footer';
import screenshot from '../screenshot.png'
import queryString from 'query-string';
import useAuth from '../hooks/UseAuth';
import {apiPath} from '../utilities'

function Landing() {

  const navigate = useNavigate()
  const { auth, setAuth } = useAuth()

  // const apiPath = "http://192.168.0.104:3001/api"
  const [user, setUser] = useState()

  useEffect(() => {
    const userSource = localStorage.getItem("user")
    if (userSource) {
      const userObj = JSON.parse(userSource)
      setAuth(true)
      setUser(userSource)
      console.log(auth,"klkl")
      console.log(userObj)
    } else {
      setAuth(false)
      console.log(auth)
    }
    console.log(auth)
  }, [auth])



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

          setAuth(true)
          setUser(data.user)
          navigate("/dashboard", { replace: true });

        } catch (error) {
        }
      }
    })();
  }, [])

  const handleLogin = () => {
    (async () => {
      try {
        //OAuth Step 1
        const response = await axios({
          url: `${apiPath}/twitter/oauth/request_token`,
          method: 'POST'
        });
        // await axios({
        //   url: `${apiPath}/home`,
        //   method: 'GET'
        // });
        // return
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
      <div className='flex flex-col px-3 sm:grid grid-cols-1 sm:grid-cols-2 sm:m-auto w-full sm:w-4/5 mt-8 sm:mt-8'>
        <div className=''>
          <p className='text-4xl font-bold text-gray-700'>Stalk Your Favourite Tweep</p>
          <p className='my-3 text-lg'>Find out the work and energy they are putting in place to grow and see results they are having</p>
          <div className='sm:grid sm:grid-cols-2'>
            <p className='text-sm text-gray-600 my-2'>See how many likes they got</p>
            <p className='text-sm text-gray-600 my-2'>See how many retweets they got</p>
            <p className='text-sm text-gray-600 my-2'>See how many tweets they sent</p>
            <p className='text-sm text-gray-600 my-2'>See how many replies they sent</p>
            <p className='text-sm text-gray-600 my-2'>See tags they used</p>
            <p className='text-sm text-gray-600 my-2'>Get their following follower ratio</p>
            <p className='text-sm text-gray-600 my-2'>See their tweeting streak</p>
          </div>
          {
            auth === true ? <><p className='my-2 text-lg'>Welcome back</p>
              <a className='inline-block mt-2 px-16 py-4 bg-green-600 rounded-md text-white font-bold' href='/dashboard'>Go To DashBoard</a>
            </> : <button className='my-4 px-16 py-4 bg-green-600 rounded-md text-white font-bold' onClick={handleLogin}>Login</button>
          }
        </div>
        <div className='text-center'>

          <img className='border rounded-sm w-full m-2' alt='Twitter login button' src={screenshot} />
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default Landing;
