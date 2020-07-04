import React from 'react'

export default class GroupDetails extends React.Component {
  render(){
    const id = this.props.match.params.id;
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">Project title - { id }</span>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et labore quaerat quibusdam vel saepe, ab voluptate accusantium culpa nemo fuga earum? Soluta amet nobis officia sed neque fuga aperiam quia?</p>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>Posted by galatoide</div>
            <div>28th June, 2am</div>
          </div>
        </div>
      </div>
    )
  }
}