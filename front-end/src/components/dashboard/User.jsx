import React, { Component } from 'react';
import AuthService from '../auth/auth-service';
import axios from 'axios';
import M from "materialize-css";

const url = process.env.CLOUDINARY_API_BASE_URL;
const preset = process.env.CLOUDINARY_UPLOAD_PRESETS_NAME;

export default class User extends Component {
    state = {  }

    service = new AuthService();

    // Materialize
    componentDidMount() { 
      // Auto initialize all the things!
      M.AutoInit();
      // this.props
    }
    
    handleChange = (event) => {
      const {name, value} = event.target;
      this.setState({[name]: value});
    }
    
    handleFileChange = (event) => {
      this.setState({ file: event.target.files[0]});
    }

    handleSubmit = (event) => {
      event.preventDefault();
      const uploadData = new FormData();
      uploadData.append("profileImageUrl", this.state.file);
      axios.post('http://localhost:5000/upload', uploadData)
          .then((response) => {
              console.log('image uploaded', response);
              
              axios.post('http://localhost:5000/images/create', {
                  profileImageUrl: response.data.profileImageUrl
              })
              .then((response) => {
                  console.log('image created', response);
                  this.setState({ name: '', description: '', file: '', feedbackMessage: 'Image uploaded sucessfully'});
              })
          })
    }  

    render() { 
        console.log('console: ',this.props)
        return ( 
            // <h1>User Profile</h1>

            <div id="main">
  <div className="wrapper">

    <section id="content">        

       <div className="container">

        <div id="profile-page" className="section">
          
          <div id="profile-page-header" className="card">
              <div className="card-image waves-effect waves-block waves-light">
                  <img style={{'max-height':'350px'}} className="activator" src="https://images.pexels.com/photos/1668211/pexels-photo-1668211.jpeg?cs=srgb&dl=photo-of-abstract-painting-on-canvas-1668211.jpg&fm=jpg" alt="user background"/>                    
              </div>
              <figure className="card-profile-image">
              {this.props.loggedInUser &&
                  <img style={{'max-width':'150px'}} src={this.props.loggedInUser.profileImageUrl} alt="profile image" className="circle z-depth-2 responsive-img activator"/>
              }
                  <a href='#update-user' class='btn green modal-trigger'>Update User</a>
              <div class='modal' id='update-user'>
                <div class="modal-content">
                  <h4>User details</h4>
                  <form id="signup-form" className="white" onSubmit={this.handleFormSubmit}>
                    <h5 className="grey-text text-darken-3">Sign Up</h5>
                    {/* <div className="input-field">
                      <label>Username</label>
                      <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                      <label htmlFor="email">Email</label>
                      <input type="email" name='email' id='signup-email' onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                      <label>Password</label>
                      <input type="password" value={this.state.password} name='password' onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                      <label htmlFor="firstName">First Name</label>
                      <input type="text" name='firstName' id='signup-firstName' onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                      <label htmlFor="lastName">Last Name</label>
                      <input type="text" name='lastName' id='signup-lastName' onChange={this.handleChange} />
                    </div> */}
                    <input type="file" onChange={this.handleFileChange} /> 
                    <div className="input-field">
                      <input className="btn pink lighten-1 z-depth-0" type="submit" value="Update" />
                    </div>
                  </form>
                </div>
              </div>
              </figure>


              <div className="card-content">
                <div className="row">                  
                  {this.props.loggedInUser &&
                  <div className="col s3 offset-s2">                        
                      <h2>
                        <h4 className="card-title grey-text text-darken-4">{this.props.loggedInUser.username}</h4>
                      </h2>
                  <p className="medium-small grey-text">{this.props.loggedInUser.firstName} {this.props.loggedInUser.lastName}</p>                        
                  </div>
                  }                            
                  <div className="col s2 center-align">
                      <h4 className="card-title grey-text text-darken-4">10+</h4>
                      <p className="medium-small grey-text">Work Experience</p>                        
                  </div>
                  <div className="col s2 center-align">
                      <h4 className="card-title grey-text text-darken-4">6</h4>
                      <p className="medium-small grey-text">Completed Projects</p>                        
                  </div>                    
                  <div className="col s2 center-align">
                      <h4 className="card-title grey-text text-darken-4">$ 1,253,000</h4>
                      <p className="medium-small grey-text">Busness Profit</p>                        
                  </div>                    
                  <div className="col s1 right-align">
                    <a className="btn-floating activator waves-effect waves-light darken-2 right">
                        <i className="mdi-action-perm-identity"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-reveal">
                  <p>
                    <span className="card-title grey-text text-darken-4">Roger Waters <i className="mdi-navigation-close right"></i></span>
                    <span><i className="mdi-action-perm-identity cyan-text text-darken-2"></i> Project Manager</span>
                  </p>

                  <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                  
                  <p><i className="mdi-action-perm-phone-msg cyan-text text-darken-2"></i> +1 (612) 222 8989</p>
                  <p><i className="mdi-communication-email cyan-text text-darken-2"></i> mail@domain.com</p>
                  <p><i className="mdi-social-cake cyan-text text-darken-2"></i> 18th June 1990</p>
                  <p><i className="mdi-device-airplanemode-on cyan-text text-darken-2"></i> BAR - AUS</p>
              </div>
          </div>
        
          <div id="profile-page-content" className="row">
            
            <div id="profile-page-sidebar" className="col s12 m4">
                        <div className="card light-blue">
                <div className="card-content white-text">
                  <span className="card-title">About Me!</span>
                  <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                </div>                  
              </div>
  
              <ul id="profile-page-about-details" className="collection z-depth-1">
                <li className="collection-item">
                  <div className="row">
                    <div className="col s5 grey-text darken-1"><i className="mdi-action-wallet-travel"></i> Project</div>
                    <div className="col s7 grey-text text-darken-4 right-align">ABC Name</div>
                  </div>
                </li>
                <li className="collection-item">
                  <div className="row">
                    <div className="col s5 grey-text darken-1"><i className="mdi-social-poll"></i> Skills</div>
                    <div className="col s7 grey-text text-darken-4 right-align">HTML, CSS</div>
                  </div>
                </li>
                <li className="collection-item">
                  <div className="row">
                    <div className="col s5 grey-text darken-1"><i className="mdi-social-domain"></i> Lives in</div>
                    <div className="col s7 grey-text text-darken-4 right-align">NY, USA</div>
                  </div>
                </li>
                <li className="collection-item">
                  <div className="row">
                    <div className="col s5 grey-text darken-1"><i className="mdi-social-cake"></i> Birth date</div>
                    <div className="col s7 grey-text text-darken-4 right-align">18th June, 1991</div>
                  </div>
                </li>
              </ul>

                        <div className="card amber darken-2">
                <div className="card-content white-text center-align">
                  <p className="card-title"><i className="mdi-social-group-add"></i> 3685</p>
                  <p>Followers</p>
                </div>                  
              </div>
                <ul id="profile-page-about-feed" className="collection z-depth-1">
                <li className="collection-item avatar">
                  <img src="images/avatar.jpg" alt="" className="circle"/>
                  <span className="title">Project Title</span>
                  <p>Task assigned to new changes.
                    <br/> <span className="ultra-small">Second Line</span>
                  </p>
                  <a href="#!" className="secondary-content"><i className="mdi-action-grade"></i></a>
                </li>
                <li className="collection-item avatar">
                  <i className="mdi-file-folder circle"></i>
                  <span className="title">New Project</span>
                  <p>First Line of Project Work 
                    <br/> <span className="ultra-small">Second Line</span>
                  </p>
                  <a href="#!" className="secondary-content"><i className="mdi-social-domain"></i></a>
                </li>
                <li className="collection-item avatar">
                  <i className="mdi-action-assessment circle green"></i>
                  <span className="title">New Payment</span>
                  <p>Last UK Project Payment
                    <br/> <span className="ultra-small">$ 3,684.00</span>
                  </p>
                  <a href="#!" className="secondary-content"><i className="mdi-editor-attach-money"></i></a>
                </li>
                <li className="collection-item avatar">
                  <i className="mdi-av-play-arrow circle red"></i>
                  <span className="title">Latest News</span>
                  <p>company management news
                    <br/> <span className="ultra-small">Second Line</span>
                  </p>
                  <a href="#!" className="secondary-content"><i className="mdi-action-track-changes"></i></a>
                </li>
              </ul>
                             <ul id="task-card" className="collection with-header">
                <li className="collection-header cyan">
                    <h4 className="task-card-title">My Task</h4>
                    <p className="task-card-date">March 26, 2015</p>
                </li>
                <li className="collection-item dismissable">
                    <input type="checkbox" id="task1" />
                    <label for="task1">Create Mobile App UI. <a href="#" className="secondary-content"><span className="ultra-small">Today</span></a>
                    </label>
                    <span className="task-cat teal">Mobile App</span>
                </li>
                <li className="collection-item dismissable">
                    <input type="checkbox" id="task2" />
                    <label for="task2">Check the new API standerds. <a href="#" className="secondary-content"><span className="ultra-small">Monday</span></a>
                    </label>
                    <span className="task-cat purple">Web API</span>
                </li>
                <li className="collection-item dismissable">
                    <input type="checkbox" id="task3" checked="checked" />
                    <label for="task3">Check the new Mockup of ABC. <a href="#" className="secondary-content"><span className="ultra-small">Wednesday</span></a>
                    </label>
                    <span className="task-cat pink">Mockup</span>
                </li>
                <li className="collection-item dismissable">
                    <input type="checkbox" id="task4" checked="checked" disabled="disabled" />
                    <label for="task4">I did it !</label>
                    <span className="task-cat cyan">Mobile App</span>
                </li>
              </ul>
                                  <div className="card center-align">
                <div className="card-content purple white-text">
                    <p className="card-stats-title"><i className="mdi-editor-attach-money"></i>Your Profit</p>
                    <h4 className="card-stats-number">$8990.63</h4>
                    <p className="card-stats-compare"><i className="mdi-hardware-keyboard-arrow-up"></i> 70% <span className="purple-text text-lighten-5">last month</span>
                    </p>
                </div>
                <div className="card-action purple darken-2">
                    <div id="sales-compositebar"></div>
                </div>
              </div>

                     <div id="flight-card" className="card">
                  <div className="card-header amber darken-2">
                      <div className="card-title">
                          <h4 className="flight-card-title">Your Next Flight</h4>
                          <p className="flight-card-date">June 18, Thu 04:50</p>
                      </div>
                  </div>
                  <div className="card-content-bg white-text">
                      <div className="card-content">
                          <div className="row flight-state-wrapper">
                              <div className="col s5 m5 l5 center-align">
                                  <div className="flight-state">
                                      <h4 className="margin">LDN</h4>
                                      <p className="ultra-small">London</p>
                                  </div>
                              </div>
                              <div className="col s2 m2 l2 center-align">
                                  <i className="mdi-device-airplanemode-on flight-icon"></i>
                              </div>
                              <div className="col s5 m5 l5 center-align">
                                  <div className="flight-state">
                                      <h4 className="margin">SFO</h4>
                                      <p className="ultra-small">San Francisco</p>
                                  </div>
                              </div>
                          </div>
                          <div className="row">
                              <div className="col s6 m6 l6 center-align">
                                  <div className="flight-info">
                                      <p className="small"><span className="grey-text text-lighten-4">Depart:</span> 04.50</p>
                                      <p className="small"><span className="grey-text text-lighten-4">Flight:</span> IB 5786</p>
                                      <p className="small"><span className="grey-text text-lighten-4">Terminal:</span> B</p>
                                  </div>
                              </div>
                              <div className="col s6 m6 l6 center-align flight-state-two">
                                  <div className="flight-info">
                                      <p className="small"><span className="grey-text text-lighten-4">Arrive:</span> 08.50</p>
                                      <p className="small"><span className="grey-text text-lighten-4">Flight:</span> IB 5786</p>
                                      <p className="small"><span className="grey-text text-lighten-4">Terminal:</span> C</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
                          <div className="map-card">
                  <div className="card">
                      <div className="card-image waves-effect waves-block waves-light">
                          <div id="map-canvas" data-lat="40.747688" data-lng="-74.004142"></div>
                      </div>
                      <div className="card-content">                    
                          <a className="btn-floating activator btn-move-up waves-effect waves-light darken-2 right">
                              <i className="mdi-maps-pin-drop"></i>
                          </a>
                          <h4 className="card-title grey-text text-darken-4"><a href="#" className="grey-text text-darken-4">Company Name LLC</a>
                          </h4>
                          <p className="blog-post-content">Some more information about this company.</p>
                      </div>
                      <div className="card-reveal">
                          <span className="card-title grey-text text-darken-4">Company Name LLC <i className="mdi-navigation-close right"></i></span>                   
                          <p>Here is some more information about this company. As a creative studio we believe no client is too big nor too small to work with us to obtain good advantage.By combining the creativity of artists with the precision of engineers we develop custom solutions that achieve results.Some more information about this company.</p>
                          <p><i className="mdi-action-perm-identity cyan-text text-darken-2"></i> Manager Name</p>
                          <p><i className="mdi-communication-business cyan-text text-darken-2"></i> 125, ABC Street, New Yourk, USA</p>
                          <p><i className="mdi-action-perm-phone-msg cyan-text text-darken-2"></i> +1 (612) 222 8989</p>
                          <p><i className="mdi-communication-email cyan-text text-darken-2"></i> support@geekslabs.com</p>                    
                      </div>
                  </div>
              </div>
                 </div>
            

                       <div id="profile-page-wall" className="col s12 m8">

              <div id="profile-page-wall-share" className="row">
                <div className="col s12">
                  <ul className="tabs tab-profile z-depth-1 light-blue">
                    <li className="tab col s3">
                      <a className="white-text waves-effect waves-light active" href="#UpdateStatus">
                      <i className="mdi-editor-border-color"></i> Update Status</a>
                    </li>
                    <li className="tab col s3">
                      <a className="white-text waves-effect waves-light" href="#AddPhotos">
                      <i className="mdi-image-camera-alt"></i> Add Photos</a>
                    </li>
                    <li className="tab col s3">
                      <a className="white-text waves-effect waves-light" href="#CreateAlbum">
                      <i className="mdi-image-photo-album"></i> Create Album</a>
                    </li>                      
                  </ul>
                             <div id="UpdateStatus" className="tab-content col s12  grey lighten-4">
                    <div className="row">
                      <div className="col s2">
                        <img src="images/avatar.jpg" alt="" className="circle responsive-img valign profile-image-post"/>
                      </div>
                      <div className="input-field col s10">
                        <textarea id="textarea" row="2" className="materialize-textarea"></textarea>
                        <label for="textarea" className="">What's on your mind?</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s12 m6 share-icons">
                        <a href="#"><i className="mdi-image-camera-alt"></i></a>
                        <a href="#"><i className="mdi-action-account-circle"></i></a>
                        <a href="#"><i className="mdi-hardware-keyboard-alt"></i></a>
                        <a href="#"><i className="mdi-communication-location-on"></i></a>
                      </div>
                      <div className="col s12 m6 right-align">
                                                 <a className='dropdown-button btn' href='#' data-activates='profliePost'><i className="mdi-action-language"></i> Public</a>

                                                    <ul id='profliePost' className='dropdown-content'>
                            <li><a href="#!"><i className="mdi-action-language"></i> Public</a></li>
                            <li><a href="#!"><i className="mdi-action-face-unlock"></i> Friends</a></li>                              
                            <li><a href="#!"><i className="mdi-action-lock-outline"></i> Only Me</a></li>
                          </ul>

                          <a className="waves-effect waves-light btn"><i className="mdi-maps-rate-review left"></i>Post</a>
                      </div>
                    </div>
                  </div>
                           <div id="AddPhotos" className="tab-content col s12  grey lighten-4">
                    <div className="row">
                      <div className="col s2">
                        <img src="images/avatar.jpg" alt="" className="circle responsive-img valign profile-image-post"/>
                      </div>
                      <div className="input-field col s10">
                        <textarea id="textarea" row="2" className="materialize-textarea"></textarea>
                        <label for="textarea" className="">Share your favorites photos!</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s12 m6 share-icons">
                        <a href="#"><i className="mdi-image-camera-alt"></i></a>
                        <a href="#"><i className="mdi-action-account-circle"></i></a>
                        <a href="#"><i className="mdi-hardware-keyboard-alt"></i></a>
                        <a href="#"><i className="mdi-communication-location-on"></i></a>
                      </div>
                      <div className="col s12 m6 right-align">
                                                 <a className='dropdown-button btn' href='#' data-activates='profliePost2'><i className="mdi-action-language"></i> Public</a>

                                                    <ul id='profliePost2' className='dropdown-content'>
                            <li><a href="#!"><i className="mdi-action-language"></i> Public</a></li>
                            <li><a href="#!"><i className="mdi-action-face-unlock"></i> Friends</a></li>                              
                            <li><a href="#!"><i className="mdi-action-lock-outline"></i> Only Me</a></li>
                          </ul>

                          <a className="waves-effect waves-light btn"><i className="mdi-maps-rate-review left"></i>Post</a>
                      </div>
                    </div>
                  </div>
                             <div id="CreateAlbum" className="tab-content col s12  grey lighten-4">
                    <div className="row">
                      <div className="col s2">
                        <img src="images/avatar.jpg" alt="" className="circle responsive-img valign profile-image-post"/>
                      </div>
                      <div className="input-field col s10">
                        <textarea id="textarea" row="2" className="materialize-textarea"></textarea>
                        <label for="textarea" className="">Create awesome album.</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s12 m6 share-icons">
                        <a href="#"><i className="mdi-image-camera-alt"></i></a>
                        <a href="#"><i className="mdi-action-account-circle"></i></a>
                        <a href="#"><i className="mdi-hardware-keyboard-alt"></i></a>
                        <a href="#"><i className="mdi-communication-location-on"></i></a>
                      </div>
                      <div className="col s12 m6 right-align">
                                                 <a className='dropdown-button btn' href='#' data-activates='profliePost3'><i className="mdi-action-language"></i> Public</a>

                                                    <ul id='profliePost3' className='dropdown-content'>
                            <li><a href="#!"><i className="mdi-action-language"></i> Public</a></li>
                            <li><a href="#!"><i className="mdi-action-face-unlock"></i> Friends</a></li>                              
                            <li><a href="#!"><i className="mdi-action-lock-outline"></i> Only Me</a></li>
                          </ul>

                          <a className="waves-effect waves-light btn"><i className="mdi-maps-rate-review left"></i>Post</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div id="profile-page-wall-posts"className="row">
                <div className="col s12">
                            <div id="profile-page-wall-post" className="card">
                      <div className="card-profile-title">
                        <div className="row">
                          <div className="col s1">
                            <img src="images/avatar.jpg" alt="" className="circle responsive-img valign profile-post-uer-image"/>                        
                          </div>
                          <div className="col s10">
                            <p className="grey-text text-darken-4 margin">John Doe</p>
                            <span className="grey-text text-darken-1 ultra-small">Shared publicly  -  26 Jun 2015</span>
                          </div>
                          <div className="col s1 right-align">
                            <i className="mdi-navigation-expand-more"></i>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col s12">
                            <p>I am a very simple wall post. I am good at containing <a href="#">#small</a> bits of <a href="#">#information</a>.  I require little more information to use effectively.</p>
                          </div>
                        </div>
                      </div>
                      <div className="card-image profile-medium">                          
                        <img src="images/gallary/2.jpg" alt="sample" className="responsive-img profile-post-image profile-medium"/>                        
                        <span className="card-title">Card Title</span>
                      </div>
                      <div className="card-content">
                        <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                      </div>
                      <div className="card-action row">
                        <div className="col s4 card-action-share">
                          <a href="#">Like</a>                          
                          <a href="#">Share</a>
                        </div>
                        
                        <div className="input-field col s8 margin">
                          <input id="profile-comments" type="text" className="validate margin"/>
                          <label for="profile-comments" className="">Comments</label>
                        </div>                        
                      </div>                        
                    </div>

                                  <div id="profile-page-wall-post" className="card">
                      <div className="card-profile-title">
                        <div className="row">
                          <div className="col s1">
                            <img src="images/avatar.jpg" alt="" className="circle responsive-img valign profile-post-uer-image"/>                        
                          </div>
                          <div className="col s10">
                            <p className="grey-text text-darken-4 margin">John Doe</p>
                            <span className="grey-text text-darken-1 ultra-small">Shared publicly  -  26 Jun 2015</span>
                          </div>
                          <div className="col s1 right-align">
                            <i className="mdi-navigation-expand-more"></i>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col s12">
                            <p>I am a very simple wall post. I am good at containing <a href="#">#small</a> bits of <a href="#">#information</a>.  I require little more information to use effectively.</p>
                          </div>
                        </div>
                      </div>
                      <div className="card-image profile-medium">
                        <div className="video-container no-controls">
                          <iframe width="640" height="360" src="https://www.youtube.com/embed/10r9ozshGVE" frameborder="0" allowfullscreen></iframe>
                        </div>                          
                        <span className="card-title">Card Title</span>
                      </div>
                      <div className="card-content">
                        <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                      </div>
                      <div className="card-action row">
                        <div className="col s4 card-action-share">
                          <a href="#">Like</a>                          
                          <a href="#">Share</a>
                        </div>
                        
                        <div className="input-field col s8 margin">
                          <input id="profile-comments" type="text" className="validate margin"/>
                          <label for="profile-comments" className="">Comments</label>
                        </div>                        
                      </div>                        
                    </div>                      

                           <div id="profile-page-wall-post" className="card">
                      <div className="card-profile-title">
                        <div className="row">
                          <div className="col s1">
                            <img src="images/avatar.jpg" alt="" className="circle responsive-img valign profile-post-uer-image"/>                        
                          </div>
                          <div className="col s10">
                            <p className="grey-text text-darken-4 margin">John Doe</p>
                            <span className="grey-text text-darken-1 ultra-small">Shared publicly  -  26 Jun 2015</span>
                          </div>
                          <div className="col s1 right-align">
                            <i className="mdi-navigation-expand-more"></i>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col s12">
                            <p>I am a very simple wall post. I am good at containing <a href="#">#small</a> bits of <a href="#">#information</a>.  I require little more information to use effectively.</p>
                          </div>
                        </div>
                      </div>
                      <div className="card-image profile-small">
                        <img src="images/gallary/1.jpg" alt="sample" className="responsive-img profile-post-image"/>                        
                        <span className="card-title">Card Title</span>
                      </div>
                      <div className="card-content">
                        <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                      </div>
                      <div className="card-action row">
                        <div className="col s4 card-action-share">
                          <a href="#">Like</a>                          
                          <a href="#">Share</a>
                        </div>
                        
                        <div className="input-field col s8 margin">
                          <input id="profile-comments" type="text" className="validate"/>
                          <label for="profile-comments" className="">Comments</label>
                        </div>                        
                      </div>                        
                    </div>

                           <div id="profile-page-wall-post" className="card">
                      <div className="card-profile-title">
                        <div className="row">
                          <div className="col s1">
                            <img src="images/avatar.jpg" alt="" className="circle responsive-img valign profile-post-uer-image"/>                        
                          </div>
                          <div className="col s10">
                            <p className="grey-text text-darken-4 margin">John Doe</p>
                            <span className="grey-text text-darken-1 ultra-small">Shared publicly  -  26 Jun 2015</span>
                          </div>
                          <div className="col s1 right-align">
                            <i className="mdi-navigation-expand-more"></i>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col s12">
                            <p>I am a very simple wall post. I am good at containing <a href="#">#small</a> bits of <a href="#">#information</a>.  I require little more information to use effectively.</p>
                          </div>
                        </div>
                      </div>
                      <div className="card-image profile-large">
                        <img src="images/gallary/3.jpg" alt="sample" className="responsive-img profile-post-image"/>                        
                        <span className="card-title">Card Title</span>
                      </div>
                      <div className="card-content">
                        <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                      </div>
                      <div className="card-action row">
                        <div className="col s4 card-action-share">
                          <a href="#">Like</a>                          
                          <a href="#">Share</a>
                        </div>
                        
                        <div className="input-field col s8 margin">
                          <input id="profile-comments" type="text" className="validate"/>
                          <label for="profile-comments" className="">Comments</label>
                        </div>                        
                      </div>                        
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </section>
  </div>
  </div>
    )
    }
}