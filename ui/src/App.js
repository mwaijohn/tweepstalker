import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Landing from './components/Landing';
import DashBoard from './components/Dashboard';
import RequireAuth from './components/RequireAuth';
import FourOFour from './components/404';

function App() {
  const [user, setUser] = useState(false)
  useEffect(() => {
    const userSource = localStorage.getItem("user")
    if (userSource) {
      setUser(userSource)
    }
  }, [user])

  return (
    <Routes>
      {
        user && (<Route exact path="/dashboard" element={<DashBoard />} />)
      }
      <Route exact path="/" element={<Landing />} />
      <Route exact path="*" element={<FourOFour />} />
    </Routes>
  );
}

export default App;
