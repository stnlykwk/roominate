import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import './App.css';
import Topbar from './shared/Topbar';
import Tabs from './shared/Tabs';
import Home from './pages/Home';
import FindClosestRoom from './pages/Find-Closest-Room';
import FindByRoom from './pages/Find-By-Room';
import FindFreeRooms from './pages/Find-Free-Rooms';
import ErrorPage from './pages/Error-Page';

function App() {
  return (
    <Router>
      <>
      <Topbar />
      <Tabs />
      <Switch>
        <Route exact path='/'>
          <Redirect to='/home' />
        </Route>
        <Route exact path='/find-free-rooms' component={FindFreeRooms} />
        <Route exact path='/find-by-room' component={FindByRoom} />
        <Route exact path='/find-closest-room' component={FindClosestRoom} />
        <Route exact path='/home' component={Home} />
        <Route path='/' component={ErrorPage} />
      </Switch>
      </>
    </Router>
  )
}

export default App;
