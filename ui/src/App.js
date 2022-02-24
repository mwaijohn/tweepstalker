import React, { useContext, useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from './components/Landing';
import DashBoard from './components/Dashboard';
import RequireAuth from './components/RequireAuth';

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
    </Routes>
  );
}

export default App;
