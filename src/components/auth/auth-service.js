import axios from 'axios';

class AuthService {
    constructor() {
        let service = axios.create({
            baseURL: 'http://localhost:5000/',
            withCredentials: true
        });
        this.service = service;
    }

    signup = (username, password, email, firstName, lastName)  => {
        return this.service.post('/signup', { username, password, email, firstName, lastName})
            .then((response) => {
                return response.data;
            });
    }

    loggedin = () => {
        return this.service.get('/loggedin')
            .then((response) => {
                return response.data;
            });
    }

    logout = () => {
        return this.service.post('/logout')
            .then((response) => {
                return response.data;
            });
    }

    login = (username, password)  => {
        return this.service.post('/login', { username, password})
            .then(response => response.data);
    }
}

export default AuthService;