import React from 'react'
import axios from 'axios';
import {NavLink} from 'react-router-dom';
import M from "materialize-css";
import { ToastContainer, toast } from 'react-toastify';
import $ from 'jquery'

export default class GroupsList extends React.Component {
  state = {
    listOfGroups: [],
    title: '',
    initials: '',
    description: '',
    volunteer: false ,
    music: false,
    travel: false,
    others: false,
    isModalOpen: true
  }

  getAllGroups = () => {
    // Get list of project from the API we just built
    axios.get('http://localhost:5000/groups', {withCredentials: true})
        .then(responseFromAPI => {
            this.setState({
                listOfGroups: responseFromAPI.data
            })
        });
  }

  componentDidMount() {
    M.AutoInit();
    this.getAllGroups();
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name] : value});
    console.log(event.target)
  }

  handleChecked = (e) => {
    const {name, checked} = e.target;
    this.setState({[name] : checked});
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {title, initials, description, volunteer, music, travel, others} = this.state
    axios.post('http://localhost:5000/groups', {title, initials, description, volunteer, music, travel, others}, {withCredentials: true})
        .then(() => { 
            this.getAllGroups();
            this.setState({
              title: '',
              initials: '',
              description: '',
              volunteer: false ,
              music: false,
              travel: false,
              others: false,
              listOfGroups:[]
            });

            this.props.history.push("/dashboard")
            toast('Group created sucessfully!');
        })
  }

  render(){
    return (
      <div className="group-list section container"> 
        <a href='#new-group-modal' className='waves-effect btn modal-trigger'>Create a new Group</a>
        <div>
              <div class="row">
          {this.state.listOfGroups.map(group=> {
            return (
                <div key={group._id} className='col s12 m5 l4'>
                {/* go to /groups/123456 */}
                  {/* <NavLink to={`/groups/${group._id}`}>
                    <h3>{group.title}</h3>
                    <p>{group.description}</p>
                  </NavLink> */}

                    <div class="card">
                      <div class="card-image">
                        <img src={group.backgroundUrl} alt='background-pic'/>
                        <span class="card-title">{group.initials}</span>
                      </div>
                      <div class="card-content">
                        <p>I am a very simple card. I am good at containing small bits of information.
                        I am convenient because I require little markup to use effectively.</p>
                      </div>
                      <div class="card-action">
                      <NavLink to={`/groups/${group._id}`}>More about us</NavLink>
                      </div>
                    </div>
                  </div>
              
            )
          })}
          </div>
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
                <label>Initials (shorter name)</label>
                <input type="text" name='initials' value={this.state.initials} className='validate' onChange={this.handleChange} />
                {/* <span class="helper-text" data-error="wrong" data-success="right">Helper text</span> */}
              </div>

              <div className="input-field">
                <textarea className='materialize-textarea' name='description' value={this.state.description} onChange={this.handleChange} />
                <label>Description</label>
              </div>

              <div>

              <label>
                <input type="checkbox" name="volunteer" checked={this.state.volunteer} onChange={this.handleChecked} />
                <span>Volunteering</span>
              </label>

              <label>
                <input type="checkbox" name="music" checked={this.state.music} onChange={this.handleChecked} />
                <span>Choir / Music</span>
              </label>

              <label>
                <input type="checkbox" name="travel" checked={this.state.travel} onChange={this.handleChecked} />
                <span>Travel</span>
              </label>

              <label>
                <input type="checkbox" name="others" checked={this.state.others} onChange={this.handleChecked} />
                <span>Others</span>
              </label>
              </div>
              
              <div className="input-field">
                <input className="btn blue lighten-1 z-depth-0" type="submit" value="Create Group" />
              </div>

            </form>
            <ToastContainer />
          </div>
        </div>
      </div>

      
    )
  }
}