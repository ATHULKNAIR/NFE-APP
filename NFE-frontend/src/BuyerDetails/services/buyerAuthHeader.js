export default function buyerAuthHeader(){
    const user = JSON.parse(localStorage.getItem("buyer"));
    if(user && user.accessToken){
        return {'x-access-token':user.accessToken};

    }else{
        return {};
    }

}