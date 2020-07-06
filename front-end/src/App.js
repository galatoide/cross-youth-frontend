import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/auth/Login';
import Navbar from './components/layout/NavBar';
import Signup from './components/auth/Signup';
import Dashboard from './components//dashboard/Dashboard';
import GroupsDetails from './components/groups/GroupsDetails';
import AuthService from './components/auth/auth-service';
import Homepage from './components/auth/Homepage';
import User from './components/dashboard/User';

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
  componentDidMount() {
    this.fetchUser();
  }
  // 1. save the user into the browser localstorage
  // OR
  // 2. check if the user is still loggedin by calling the backend
  fetchUser = () => {
    console.log('set user')
    if(this.state.loggedInUser === null) {
      this.service.loggedin() 
        .then(response => {
          if (response._id) {
            this.setCurrentUser(response);
            localStorage.setItem("loggedin", true);
          } else {
            localStorage.clear();
          }
        })
    }
  }

  render(){
    this.fetchUser();

    return (
      <div>
      <Navbar setCurrentUser={this.setCurrentUser} loggedInUser={this.state.loggedInUser}/>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/login' render={(props) => <Login setCurrentUser={this.setCurrentUser} {...props} /> } />
          <Route exact path='/signup' render={(props) => <Signup setCurrentUser={this.setCurrentUser} {...props} /> } />
          <Route exact path='/logout' component={Homepage} Redirect to="/"/>
          <Route exact path='/groups/:id' component={GroupsDetails} />
          <Route exact path='/dashboard' render={(props) => {
            if (localStorage.getItem("loggedin")) {
              return <Dashboard loggedInUser={this.state.loggedInUser} {...props} />
            } else {
              return <Redirect to="/login" />
            }}}
           />
          <Route exact path='/user' render={(props) => {
            if (localStorage.getItem("loggedin")) {
              return <User loggedInUser={this.state.loggedInUser} {...props} />
            } else {
              return <Redirect to="/login" />
            }}}
           />
           {/*If weird link go to homepage  */}
          <Route path='/' render={(props) => {
              if (localStorage.getItem("loggedin")) {
                return <Homepage loggedInUser={this.state.loggedInUser} {...props} />
              } else {
                return <Redirect to="/" />
              }}}
            />
        </Switch>
      </div>
    );
  }
}