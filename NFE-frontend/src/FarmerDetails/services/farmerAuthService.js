import axios from 'axios';

class AuthService {
    login(phoneNo , password){
        return axios.post('http://localhost:5000/farmer/login',{
            phoneNo,password
        })
        .then(res=>{
            if(res.data.accessToken){
                localStorage.setItem("farmer",JSON.stringify(res.data))
            }
            return res.data;
        });
    }
    logout(){
        localStorage.removeItem("farmer");
    }
    register(name,phoneNo,password){
        return axios.post('http://localhost:5000/farmer/register',{
            name,phoneNo,password
        });
    }
    getCurrentUser(){
        return JSON.parse(localStorage.getItem("farmer"));
    }
}

export default new AuthService();