import axios from 'axios';
import buyerAuthHeader from './buyerAuthHeader';

const getBuyerProfile = () =>{
    return axios.get('http://localhost:5000/buyer/profile',{
        headers:buyerAuthHeader()
    });
}

export  {getBuyerProfile};