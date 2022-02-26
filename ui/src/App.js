import React from 'react';
import { Routes, Route } from "react-router-dom";
import Landing from './components/Landing';
import DashBoard from './components/Dashboard';
import RequireAuth from './components/RequireAuth';
import FourOFour from './components/404';

function App() {
  return (
    <Routes>
      <Route exact path="/dashboard" element={
        <RequireAuth>
          <DashBoard />
        </RequireAuth>
      }
      />
      <Route exact path="/" element={<Landing />} />
      <Route exact path="*" element={<FourOFour />} />
    </Routes>
  );
}

export default App;
