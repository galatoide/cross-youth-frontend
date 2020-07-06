import React from 'react'
import GroupsSummary from './GroupsSummary';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

export default class GroupsList extends React.Component {
  state = {
    listOfGroups: []
  }

  getAllGroups = () => {
    // Get list of group from the API we just built
    axios.get('http://localhost:5000/groups')
        .then(responseFromAPI => {
            this.setState({
              listOfGroups: responseFromAPI.data
            })
        });
  }

  componentDidMount() {
  this.getAllGroups();
  }

  render(){
    return (
      <div className="group-list section">  
        <GroupsSummary />
        {this.state.listOfGroups.map(group=> {
          return (
            <div key={group._id}>
            {/* go to /groups/123456 */}
              <NavLink to={`/groups/${group._id}`}>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
              </NavLink>
            </div>
          )
        })}
      </div>
      
    )
  }
}