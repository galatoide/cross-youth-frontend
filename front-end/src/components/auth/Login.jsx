import React, { Component } from 'react'
import AuthService from './auth-service';

export default class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  service = new AuthService();

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    })
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
        const { username, password } = this.state;
        this.service.login(username, password)
            .then(response => {
                //Set the whole application with the user that just logged in
                this.props.setCurrentUser(response);
                this.setState({
                  username: '',
                  password: ''
                });
                this.props.history.push('/dashboard'); // where it redirects after sucessful login
            })
  }
  render() {
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label htmlFor="username">Username</label>
            <input type="text" name='username' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" name='password' onChange={e => this.handleChange(e)} />
          </div>
          <div className="input-field">
            {/* <NavLink to='/dashboard' className="btn pink lighten-1 z-depth-0">Login</NavLink> */}
            <input className="btn pink lighten-1 z-depth-0" type="submit" value="Login" />
          </div>
        </form>
      </div>
    )
  }
}