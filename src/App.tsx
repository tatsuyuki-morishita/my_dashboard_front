import React from 'react';
import Menu from './components/Menu';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';

function App() {
  return (
    <div className="App">
      <Menu />
    </div>
  );
}

export default App;
