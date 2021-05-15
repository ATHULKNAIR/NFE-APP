import React from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

const BuyerProfile = ()=>{

    const {user:currentUser} = useSelector((state)=>state.auth)
    if(!currentUser){
        return <Redirect to="/buyer/login" />;
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h3><strong>{currentUser.name}</strong></h3>
            </header>
            <div>
                <img src={currentUser.photo ? currentUser.photo :"https://res.cloudinary.com/mycartdb/image/upload/v1620580596/BuyerPic_kvbzkf.png"} alt="profile-image"
                     className="profile-img-card"/>
                     
            </div>
            <p>
                <strong>Token : </strong>{currentUser.accessToken.substring(0,20)} ...{" "}
                                {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
            </p>
            <p>
                <strong>ID : </strong>{currentUser.id}
            </p>
            <p>
                <strong>Name : </strong>{currentUser.name}
            </p>
            <p>
                <strong>Email : </strong>{currentUser.email}
            </p>
            <p>
                <strong>Role : </strong>{currentUser.role}
            </p>
        </div>
    )
}

export default BuyerProfile;