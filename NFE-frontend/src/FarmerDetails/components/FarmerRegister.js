import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";


import {FarmRegister} from '../actions/auth';

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
  const validPhoneNo = (value) => {
    if (value.length != 10 ) {
      return (
        <div className="alert alert-danger" role="alert">
          Phone Number should be 10 digits..!
        </div>
      );
    }
  };const validPassword = (value) => {
    if (value.length < 6 ) {
      return (
        <div className="alert alert-danger" role="alert">
          The password too short.
        </div>
      );
    }
  };

  const FarmerRegsiter = () =>{

    const form = useRef();
    const checkBtn = useRef();
    const [name, setName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    const onChangeName = (e)=>{
        const name = e.target.value;
        setName(name);
    };

    const onChangePhoneNo = (e)=>{
        const phoneNo = e.target.value;
        setPhoneNo(phoneNo);
    };
    const onChangePassword = (e)=>{
        const password = e.target.value;
        setPassword(password);
    };

    const handleRegister=(e)=>{
        e.preventDefault();
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            dispatch(FarmRegister(name, phoneNo, password))
              .then(() => {
                setSuccessful(true);
              })
              .catch(() => {
                setSuccessful(false);
              });
        }
    };

    return(
        <div className="col-md-12">
            <div className="card card-container">
                <img src=" https://res.cloudinary.com/mycartdb/image/upload/v1620580841/FarmerPic_ilo32n.jpg"
                     alt="profile-image" className="profile-img-card" 
                />
                <Form onSubmit={handleRegister} ref={form}>
                  {!successful && (
                    <div>
                      <div className="form-group">
                        <label htmlFor="name">Username</label>
                        <Input type="text" className="form-control" name="name" value={name}
                               onChange={onChangeName} validations={[required]}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="phoneNo">Phone Number</label>
                        <Input type="text" className="form-control" name="phoneNo" value={phoneNo}
                               onChange={onChangePhoneNo} validations={[required, validPhoneNo]}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Input type="password" className="form-control" name="password"
                               value={password} onChange={onChangePassword} 
                               validations={[required, validPassword]}
                        />
                      </div>

                      <div className="form-group">
                        <button className="btn btn-primary btn-block">Sign Up</button>
                      </div>
                    </div>
                  )}

                  {message && (
                    <div className="form-group">
                    <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                        {message}
                    </div>
                    </div>
                )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
                <p>Already an account? <a href="/farmer/login">Login</a></p>
            </div>
            
        </div>
    )
  }

  

 
  export default FarmerRegsiter