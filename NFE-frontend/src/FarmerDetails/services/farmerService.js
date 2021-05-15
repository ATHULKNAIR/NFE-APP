import axios from 'axios';
import farmerAuthHeader from './farmerAuthHeader';

const getFarmerProfile = ()=>{
    return axios.get('http://localhost:5000/farmer/profile',{
        headers: farmerAuthHeader()
    });
}

export  {getFarmerProfile};