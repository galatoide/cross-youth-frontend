import React from 'react'
import axios from 'axios'
import M from "materialize-css";

export default class GroupsDetails extends React.Component {
  state={
  }

  componentDidMount() {
    M.AutoInit();
    this.getSingleGroup();
  }

  getSingleGroup = () => {
    //id of the project is on the url /projects/1234567
    const { params } = this.props.match;
    axios.get(`http://localhost:5000/groups/${params.id}`)
        .then(responseFromAPI => {
            const group = responseFromAPI.data;
            //1. Option one
            /* this.setState({
                title: project.title,
                description: project.description
            })*/

            //2. Option two
            this.setState(group);
        })
  }

  render(){
    const id = this.props.match.params.id;
    return (
      <div className="container">
        {/* <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{ this.state.title }</span>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et labore quaerat quibusdam vel saepe, ab voluptate accusantium culpa nemo fuga earum? Soluta amet nobis officia sed neque fuga aperiam quia?</p>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>Posted by galatoide</div>
            <div>28th June, 2am</div>
          </div>
        </div> */}

        <div className='section'>
          <div className='row'>
            <div className='col l8 s12'>
              <h2>{this.state.title}</h2>
              <img style={{ width:'800px'}} src={this.state.backgroundUrl} alt=""/>
            </div>

            <div className='col l4 s12'>
              <div className='card-panel red' style={{'min-height': '640px'}}>
                <h6>DETAILS</h6>
                <hr/>

                <span className='detail-title'>
                  <i class=" material-icons">location_on</i>
                  Address
                </span>
                <span>Address Address Address Address Address</span>
                <hr/>

                <span className='detail-title'>
                  <i class=" material-icons">accessibility</i>
                  Activities
                </span>

                {this.state.volunteer === true && 
                <div>
                  <i class="material-icons">pan_tool</i>
                  Volunteer
                  </div>
                }

                {this.state.music === true && 
                <div>
                  <i class="material-icons">music_note</i>
                  Music
                </div>
                }

                {this.state.travel === true && 
                <div>
                  <i class="material-icons">directions_walk</i>
                  Travel
                </div>                }
                {this.state.others === true && 
                  <div>
                  <i class="material-icons">mood</i>
                  Others
                </div>
                }
                

                <hr/>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}