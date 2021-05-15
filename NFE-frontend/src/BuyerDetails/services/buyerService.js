import axios from 'axios';
import buyerAuthHeader from './buyerAuthHeader';

const getProfile = () =>{
    return axios.get('http://localhost:5000/buyer/profile',{
        headers:buyerAuthHeader()
    });
}

export {getProfile};