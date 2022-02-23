import { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Landing from './Landing';
import Home from './components/Home';
import useAuth from './hooks/UseAuth';


function RequireAuth({ children }) {
  const { authed } = useAuth();

  return authed === true ? children : <Navigate to="/" replace />;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState()

  useEffect(() => {
    const userSource = localStorage.getItem("user")
    if (userSource) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [isLoggedIn])
  return (
    <Routes>
      <Route exact path="/dashboard" element={
        <RequireAuth>
          <Home />
        </RequireAuth>
      } />
      <Route exact path="/" element={<Landing />} />
    </Routes>
  );
}

export default App;
