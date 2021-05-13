import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../../utils/notification'
import {dispatchLogin} from '../../../../redux/actions/authAction';
import {useDispatch} from 'react-redux'



const initialState = {
    phoneNo: '',
    password: '',
    err: '',
    success: ''
}

function FarmerLogin() {
    const [user, setUser] = useState(initialState)
    const dispatch = useDispatch()
    const history = useHistory()

    const {phoneNo, password, err, success} = user

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }


    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:5000/farmer/login', {phoneNo, password})
            setUser({...user, err: '', success: res.data.msg})

            localStorage.setItem('secondLogin', true)

            dispatch(dispatchLogin())
            history.push("/farmer/home")

        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

   

    return (
        <div className="login_page">
            <h2>Login</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="phoneNo">Phone Number</label>
                    <input type="text" placeholder="Enter phoneNo address" id="phoneNo"
                    value={phoneNo} name="phoneNo" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter password" id="password"
                    value={password} name="password" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <button type="submit">Login</button>
                    <Link to="/forgot_password">Forgot your password?</Link>
                </div>
            </form>

            <p>New Customer? <Link to="/farmer/register">Register</Link></p>
            <div>
              <Link to='/'>Back</Link>
            </div>
        </div>
    )
}

export default FarmerLogin