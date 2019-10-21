import React from 'react';
import Router from './router/public'
import arr from './router/index'
function App() {
  return (
    <div className="App">
      <Router routes={arr}></Router>
    </div>
  );
}

export default App;