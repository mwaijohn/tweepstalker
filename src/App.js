import { useState, useEffect } from 'react';
import Home from './Home';

function App() {
  return (
    <div className="w-full h-screen">
      <Home isLoggedIn={false}/>
    </div>
  );
}

export default App;
