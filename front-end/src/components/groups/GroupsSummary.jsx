import React from 'react'

export default class GroupSummary extends React.Component {
  render(){
    // const id = this.props.match.params.id;
    return (
      <div className="card z-depth-0 project-summary">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title ">Group title </span>
          <p>Posted by user</p>
          <p className="grey-text">Posted: 28th June, 2am</p>
        </div>
      </div>
    )
  }
}