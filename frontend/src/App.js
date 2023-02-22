import './App.css';
import { Route } from "react-router-dom";
import HomePage from './Pages/HomePage';
import ChatPage from './Pages/ChatPage';
import React, { useEffect } from 'react';


function App() {
  useEffect(() => {
    document.title = "MernAt - Socialize Yourself"
    // eslint-disable-next-line
  }, []);
  
  return (
    <div className="App">
      <Route exact path= '/' component={HomePage} exact />
      <Route path= '/chats' component={ChatPage} />
    </div>
  );
}

export default App;
