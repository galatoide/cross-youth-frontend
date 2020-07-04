import React, { Component } from 'react'
import GroupList from '../groups/GroupsList'
import Notifications from './Notifications'
import AuthService from '../auth/auth-service';

class Dashboard extends Component {
  service = new AuthService();

  render() {
    console.log(this.props)
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <GroupList />
          </div>
          <div className="col s12 m5 offset-m1">
            <Notifications />
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard