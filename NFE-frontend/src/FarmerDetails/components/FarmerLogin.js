import React,{useState,useRef} from 'react';
import {Redirect} from 'react-router-dom';

import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

import {useDispatch,useSelector} from 'react-redux';
import {FarmLogin} from '../actions/auth';


const required = (value)=>{
    if(!value){
        return (
            <div className='alert alert-danger' role='alert'>
                This field is required..!
            </div>
        )
    }
};

const FarmerLogin=(props)=>{
    const form = useRef();
    const checkBtn = useRef();
    
    const [phoneNo ,setPhoneNo] = useState('');
    const [password ,setPassword] = useState('');
    const [loading ,setLoading] = useState(false);

    const {isLoggedIn} = useSelector(state=>state.auth);
    const {message} = useSelector(state=>state.message);

    const dispatch = useDispatch();

    const onChangePhoneNo = (e)=>{
        const phoneNo = e.target.value;
        setPhoneNo(phoneNo)
    };
    const onChangePassword = (e)=>{
        const password = e.target.value;
        setPassword(password);
    };
    const handleLogin=(e)=>{
        e.preventDefault();
        setLoading(true);

        form.current.validateAll();

        if(checkBtn.current.context._errors.length === 0){
            dispatch(FarmLogin(phoneNo,password))
              .then(()=>{
                  props.history.push('/farmer/profile');
                  window.location.href.reload();
              })
              .catch(()=>{
                  setLoading(false);
              });
        }else{
            setLoading(false);
        }
    };
    if(isLoggedIn){
        return <Redirect to="/farmer/profile" />;
    }

    return (
        <div className='col-md-12'>
            <div className='card card-container'>
                <img src="https://res.cloudinary.com/mycartdb/image/upload/v1620580841/FarmerPic_ilo32n.jpg"
                     alt="profile-image"
                     className="profile-img-card" />
                <Form onSubmit={handleLogin} ref={form}>
                    <div className="form-group">
                        <label htmlFor="phoneNo">Phone Number</label>
                        <Input type="text" className="form-control" name="phoneNo" value={phoneNo} 
                               onChange={onChangePhoneNo} validations={[required]} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Input type="password" className="form-control" name="password"
                               value={password} onChange={onChangePassword} validations={[required]} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block" disabled={loading}>
                            {loading && (<span className="spinner-border spinner-border-sm"></span>)}
                            <span>Login</span>
                        </button>
                    </div>
  
                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                               {message}
                            </div>
                        </div>
                    )}
                    <div>
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                    </div>
                    
                </Form>
                <p>New Customer? <a href="/farmer/register">Register</a></p>
            </div>
            
        </div>
    )
}

export default FarmerLogin