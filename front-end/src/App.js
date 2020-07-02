import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/auth/Login';
import Navbar from './components/layout/NavBar';
import Signup from './components/auth/Signup';
import Dashboard from './components//dashboard/Dashboard';
import GroupDetails from './components/groups/GroupDetails';
import AuthService from './components/auth/auth-service';
import Homepage from './components/auth/Homepage';

export default class App extends React.Component {
  state = {
    loggedInUser: null 
  }
  service = new AuthService();
  
  setCurrentUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }
  
  
  // 1. save the user into the browser localstorage
  // OR
  // 2. check if the user is still loggedin by calling the backend
  fetchUser = () => {
    if(this.state.loggedInUser === null) {
      this.service.loggedin() 
        .then(response => {
          if (response._id) {
            this.setState({
              loggedInUser: response
            })
          }
        })
    }
  }

  render(){
    return (
      <div>
      <Navbar setCurrentUser={this.setCurrentUser} loggedInUser={this.state.loggedInUser}/>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/login' render={(props) => <Login setCurrentUser={this.setCurrentUser} {...props} /> } />
          <Route exact path='/signup' render={(props) => <Signup setCurrentUser={this.setCurrentUser} {...props} /> } />
          <Route exact path='/logout' component={Homepage} Redirect to="/"/>
          <Route path='/group/:id' component={GroupDetails} />
          <Route path='/dashboard' component={Dashboard} />
        </Switch>
      </div>
    );
  }
}