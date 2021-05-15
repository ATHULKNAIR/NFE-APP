import axios from 'axios';

class AuthService {

    login(email,password){
        return axios.post('http://localhost:5000/buyer/login',{
            email,password
        })
        .then(res=>{
            if(res.data.accessToken){
                localStorage.setItem("buyer",JSON.stringify(res.data))
            }
            return res.data;
        });
    }

    logout(){
        localStorage.removeItem("buyer");
    }

    register(name,email,password){
        return axios.post("http://localhost:5000/buyer/register",{
            name,email,password
        });
    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem("buyer"));
    }
}

export default new AuthService();