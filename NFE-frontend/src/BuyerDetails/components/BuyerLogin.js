import React,{useState,useRef} from 'react';
import {Redirect} from 'react-router-dom';

import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

import {useDispatch,useSelector} from 'react-redux';
import {Login} from '../actions/auth';

const required = (value)=>{
    if(!value){
        return (
            <div className='alert alert-danger' role='alert'>
                This field is required..!
            </div>
        )
    }
};

const BuyerLogin = (props)=>{
    const form = useRef();
    const checkBtn = useRef();
    
    const [email ,setEmail] = useState('');
    const [password ,setPassword] = useState('');
    const [loading ,setLoading] = useState(false);

    const {isLoggedIn} = useSelector(state=>state.auth);
    const {message} = useSelector(state=>state.message);

    const dispatch = useDispatch();

    const onChangeEmail = (e)=>{
        const email = e.target.value;
        setEmail(email);
    }

    const onChangePassword = (e)=>{
        const password = e.target.value;
        setPassword(password);
    }

    const handleLogin=(e)=>{
        e.preventDefault();
        setLoading(true);

        form.current.validateAll();

        if(checkBtn.current.context._errors.length === 0){
            dispatch(Login(email,password))
              .then(()=>{
                  props.history.push('/buyer/profile');
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
        return <Redirect to="/buyer/profile" />;
    }

    return (
        <div className='col-md-12'>
            <div className='card card-container'>
                <img src="https://res.cloudinary.com/mycartdb/image/upload/v1620580596/BuyerPic_kvbzkf.png"
                     alt="profile-image"
                     className="profile-img-card" />
                <Form onSubmit={handleLogin} ref={form}>
                    <div className="form-group">
                        <label htmlFor="name">Email Address</label>
                        <Input type="text" className="form-control" name="email" value={email} 
                               onChange={onChangeEmail} validations={[required]} />
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
                <p>New Customer? <a href="/buyer/register">Register</a></p>
            </div>
            
        </div>
    );
};

export default BuyerLogin;