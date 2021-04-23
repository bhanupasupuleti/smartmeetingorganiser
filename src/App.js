import React from 'react';
import {Route, Router } from "react-router-dom";

import './App.scss'
import Home from './components/Home';
import AddMeeting from './components/AddMeeting';
import history from './misc/history';

class App extends React.Component{
  render(){
    return(
      <div className='App'>
        <Router history={history}>
          <div>
            <Route path="/" exact >
              <Home />
            </Route>
            <Route path='/addmeeting'>
            <AddMeeting />
            </Route>
          </div>
        </Router>        
      </div>
    )
  }
}
export default App
