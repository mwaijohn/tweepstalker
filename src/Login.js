import React,{useState,useEffect} from 'react';
import axios from 'axios'
import Nav from './components/Nav';
import Footer from './components/Footer';
import screenshot from './screenshot.png'

function Login() {
  const apiPath = "http://localhost:3001/api"

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
      <div className='grid grid-cols-1 sm:grid-cols-2 m-auto w-full sm:w-4/5 mt-8'>
        <div className=''>
          <p className='text-4xl font-bold text-gray-700'>Stalk Your Favourite Tweep</p>
          <p className='my-3 text-lg'>Find out the work and energy they are putting in place to grow and see results they are having</p>
          <div className='grid grid-cols-2 '>
            <p className='text-sm text-gray-600 my-1'>See how many likes they got</p>
            <p className='text-sm text-gray-600 my-1'>See how many retweets they got</p>
            <p className='text-sm text-gray-600 my-1'>See how many tweets they sent</p>
            <p className='text-sm text-gray-600 my-1'>See how many replies they sent</p>
            <p className='text-sm text-gray-600 my-1'>See tags they used</p>
            <p className='text-sm text-gray-600 my-1'>Get their following follower ratio</p>
            <p className='text-sm text-gray-600 my-1'>See their tweeting streak</p>
          </div>
          {
            isLoggedIn ? <><p className='my-2 text-lg'>Welcome back {user.name}</p>
            <a className='inline-block mt-2 px-16 py-4 bg-green-600 rounded-md text-white font-bold' href='/'>Go To DashBoard</a>
            </> :<button className='my-4 px-16 py-4 bg-green-600 rounded-md text-white font-bold' onClick={login}>Login</button>
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

export default Login;
