import React from 'react'
import GroupsSummary from './GroupsSummary';
import axios from 'axios';
import {NavLink} from 'react-router-dom';
import M from "materialize-css";
import { ToastContainer, toast } from 'react-toastify';
export default class GroupsList extends React.Component {
  state = {
    listOfGroups: [],
    title: '',
    initials: '',
    description: '',
    activities: '',
  }

  componentDidMount() {
    M.AutoInit();
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name] : value});
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {title, initials, description, activities} = this.state
    axios.post('http://localhost:5000/groups', {title, initials, description, activities}, {withCredentials: true})
        .then(() => { 
            //1. Lift the state up and push new project into the state that lives on projectlist
            //2. Call the api to get all projects again
            // this.props.refreshGroups();
            this.setState({
              title: '',
              initials: '',
              description: '',
              activities: ''
            })
            ;
            // this.props.history.push("/groups")
            toast('Group created sucessfully!');
        })
  }

  render(){
    return (
      <div className="group-list section container"> 
        <a href='#new-group-modal' className='waves-effect btn modal-trigger'>Create a new Group</a>
        {/* <GroupsSummary /> */}
        <div>
          {this.state.listOfGroups.map(group=> {
            return (
              <div key={group._id} className=''>
              {/* go to /groups/123456 */}
                <NavLink to={`/groups/${group._id}`}>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                </NavLink>
              </div>
            )
          })}
        </div>

        <div className='modal' id='new-group-modal'>
          <div className='modal-content'>

            <form id="signup-form" className="white col s12" onSubmit={this.handleFormSubmit}>
              <h5 className="grey-text text-darken-3">Sign Up</h5>
              <div className="input-field">
                <label>Title</label>
                <input type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
              </div>
              <div className="input-field">
                <label htmlFor="text">Initials (shorter name)</label>
                <input type="text" name='initials' value={this.state.initials} className='validate' onChange={this.handleChange} />
                {/* <span class="helper-text" data-error="wrong" data-success="right">Helper text</span> */}
              </div>
              <div className="input-field">
                <textarea className='materialize-textarea' name='description' value={this.state.description} onChange={this.handleChange} />
                <label>Description</label>
              </div>
              
              <div className="input-field">
                <input className="btn blue lighten-1 z-depth-0" type="submit" value="Create Group" />
              </div>
            </form>
          </div>
        </div>
      </div>

      
    )
  }
}