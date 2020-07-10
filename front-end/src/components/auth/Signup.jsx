import React, { Component } from 'react';
import AuthService from './auth-service';

export default class Signup extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: ''
  }

  service = new AuthService();
  
  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    })
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {username, password, email, firstName, lastName} = this.state;
    this.service.signup(username, password, email, firstName, lastName)
        .then(response => {
            this.setState({
                username: '', 
                password: ''
            });
            localStorage.setItem("loggedin", true);
            this.props.history.push("/dashboard")
            this.props.setCurrentUser(response)
        })
        .catch(error => console.log(error))
}

  render() {
    return (
      <div className="container">
      <div class="row">
        <form id="signup-form" className="white col s12" onSubmit={this.handleFormSubmit}>
          <h5 className="grey-text text-darken-3">Sign Up</h5>
          <div className="input-field">
            <label>Username</label>
            <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" name='email' id='signup-email' className='validate' onChange={this.handleChange} />
            {/* <span class="helper-text" data-error="wrong" data-success="right">Helper text</span> */}
          </div>
          <div className="input-field">
            <label>Password</label>
            <input type="password" value={this.state.password} name='password' onChange={this.handleChange} />
          </div>
          <div class="row">
          <div className="input-field col s6">
            <label htmlFor="firstName">First Name</label>
            <input type="text" name='firstName' id='signup-firstName' onChange={this.handleChange} />
          </div>
          <div className="input-field col s6">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name='lastName' id='signup-lastName' onChange={this.handleChange} />
            </div>
            </div>
          <div className="input-field">
            <input className="btn pink lighten-1 z-depth-0" type="submit" value="Sign up" />
          </div>
        </form>
      </div>
      </div>
    )
  }
}