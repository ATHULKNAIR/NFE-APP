import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
  } from "./types";

  import AuthService from '../services/farmerAuthService';

  export const FarmRegister = (name,phoneNo,password)=>(dispatch)=>{
      return AuthService.register(name,phoneNo,password)
        .then((response)=>{
            dispatch({
                type: REGISTER_SUCCESS
            })
            dispatch({
                type:SET_MESSAGE,
                payload:response.data.message
            });
            return Promise.resolve();
        },
        (error)=>{
            const message = (error.response && error.response.data &&
                            error.response.data.message) ||
                            error.message || error.toString();
                dispatch({
                    type : REGISTER_FAIL
                });
                dispatch({
                    type : SET_MESSAGE,
                    payload : message
                });
                return Promise.reject();
        })
  };

  export const FarmLogin = (phoneNo,password)=>(dispatch)=>{
      
    return AuthService.login(phoneNo,password)
      .then((data)=>{
          dispatch({
              type: LOGIN_SUCCESS,
              payload : {user: data}
          });
          return Promise.resolve();
      },
      (error)=>{
        const message = (error.response && error.response.data &&
                         error.response.data.message) ||
                         error.message || error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
      });
  };

  export const FarmLogout =()=>(dispatch)=>{
      AuthService.logout();

      dispatch({
          type:LOGOUT
      });
  };