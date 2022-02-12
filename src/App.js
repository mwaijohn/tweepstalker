import logo from './logo.svg';
import './App.css';

import axios from 'axios'

function App() {

  const apiPath = "http://localhost:3001"
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <br></br>
        <button onClick={login}>Login With Twitter</button>
      </header>
    </div>
  );
}

export default App;
