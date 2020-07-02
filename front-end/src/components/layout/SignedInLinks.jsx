import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedInLinks = () => {
  return (
    <div>
      <ul className="right">
        <li><NavLink to='/new-group'>New Group</NavLink></li>
        <li><NavLink to='/logout'>Log Out</NavLink></li>
        <li><NavLink to='/' className="btn btn-floating pink lighten-1">WC</NavLink></li>
      </ul>
    </div>
  )
}

export default SignedInLinks