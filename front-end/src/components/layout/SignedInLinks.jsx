import React from 'react'
import { NavLink } from 'react-router-dom'
import AuthService from '../auth/auth-service';

export default class SignedInLinks extends React.Component {

  service = new AuthService();

  logoutUser = () => {
    console.log('logout: ',this.props)
    console.log('service: ',this.service)
    console.log('history: ',this.props.history)
    this.service.logout()
        .then(() => {
            this.props.setCurrentUser(null);
            // this.props.history.push('/dashboard'); // where it redirects after logout
            localStorage.clear();
        })
  }

  render(){
    return (
      <div>
        <ul className="right">
          <li><NavLink to='/new-group'>New Group</NavLink></li>
          <li><NavLink to='/' onClick={this.logoutUser}>Log Out</NavLink></li>
          <li><NavLink to='/user' className="btn btn-floating pink lighten-1">WC</NavLink></li>
        </ul>
      </div>
    )
  }
} 