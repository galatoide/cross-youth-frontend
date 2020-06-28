import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './auth/Login';
import Navbar from './layout/NavBar';
import SignUp from './auth/Signup';
import Dashboard from './dashboard/Dashboard';
import GroupDetails from './groups/GroupDetails';


function App() {
  return (
    <div>
    <Navbar/>
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={SignUp} />
        <Route path='/group/:id' component={GroupDetails} />
      </Switch>
    </div>
  );
}

export default App;
