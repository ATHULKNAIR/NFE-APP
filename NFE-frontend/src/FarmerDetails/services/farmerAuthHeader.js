export default  function farmerAuthHeader(){
    const user = JSON.parse(localStorage.getItem("farmer"));
    if(user && user.accessToken){
        return {'x-access-token':user.accessToken};
    }else{
        return {};
    }
}