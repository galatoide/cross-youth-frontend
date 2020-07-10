import React, { Component } from "react";
 
// import the service file since we need it to send (and get) the data to(from) server
import axios from 'axios';
 
class AddImage extends Component {
    state = {
        username: '',
        profileImageUrl: '',
        feedbackMessage: ""
    };
    
    handleChange = (event) => {  
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    
    handleFileChange = (event) => {
        this.setState({ file: event.target.files[0]});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const uploadData = new FormData();
        uploadData.append("profileImageUrl", this.state.file);
        axios.post('http://localhost:5000/user/edit', uploadData)
            .then((response) => {
                console.log('image uploaded', response);
                
                axios.post('http://localhost:5000/images/create', {
                    username: this.state.username,
                    profileImageUrl: response.data.profileImageUrl
                })
                .then((response) => {
                    console.log('image created', response);
                    this.setState({ username: '', file: '', feedbackMessage: 'Image uploaded sucessfully'});
                })
            })
    }  
    
    render() {
        return (
          <div>
            <h2>New Image</h2>
            <form onSubmit={this.handleSubmit}>
                <label>username</label>
                <input 
                    type="text" 
                    name="username" 
                    value={ this.state.username } 
                    onChange={this.handleChange} />
                <input type="file" name='profileImageUrl' onChange={this.handleFileChange} /> 
                <button type="submit">Save new image</button>
            </form>
            <div>{this.state.feedbackMessage}</div>
          </div>
        );
    }
}
 
export default AddImage;