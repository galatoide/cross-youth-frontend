import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import AuthService from '../auth/auth-service';

export default class Navbar extends React.Component {

  service = new AuthService();

  render() {
      if (this.props.loggedInUser) {
        return (
          // Signed IN
          <nav className="nav-wrapper grey darken-3">
            <div className="container">
              <Link to='/dashboard' className="brand-logo">Youth's Cross</Link>
              <SignedInLinks {...this.props} />
            </div>
          </nav>
        )
      } else {
        return(
          // Signed OUT
          <nav className="nav-wrapper grey darken-3">
            <div className="container">
              <Link to='/' className="brand-logo">Youth's Cross</Link>
              <SignedOutLinks />
            </div>
          </nav>
          )
      }
    }
}