import {
    // ERROR,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_REGISTRATION_REQUEST,
    USER_REGISTRATION_SUCCESS,
    USER_REGISTRATION_FAILURE,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAILURE,
    USER_DATA_FETCH_REQUEST,
    USER_DATA_FETCH_SUCCESS,
    USER_DATA_FETCH_FAILURE
} from '../constants/actionTypes';
import axios from 'axios';
import { API_URL } from '../constants/config';
import { history } from '../';

export function registerUser(credentials){
    return dispatch => {
        dispatch(requestRegistration(credentials))

        axios
            .post(API_URL+'/auth/register', credentials)
            .then(res => {
                if(res.status===200 || res.status===201){
                    dispatch(receiveRegistration(res.data));
                    dispatch(loginUser({email: credentials.email, password: credentials.password}));
                }else{
                    dispatch(errorRegistration(res.data.error));
                    return Promise.reject(res.data);
                }
            })
            .catch(err => console.log(err));
    }


    function requestRegistration(credentials){
        return {
            type: USER_REGISTRATION_REQUEST,
            payload: credentials
        }
    }

    function receiveRegistration(user){
        return {
            type: USER_REGISTRATION_SUCCESS,
            payload: user.user_token
        }
    }

    function errorRegistration(err){
        return {
            type: USER_REGISTRATION_FAILURE,
            payload: err
        }
    }
}

export function loginUser(credentials){
    return dispatch => {
        dispatch(requestLogin(credentials));
        
        axios
            .post(API_URL+'/auth/login', credentials)
            .then(res => {
                if(res.status===200){
                    dispatch(receiveLogin(res.data));
                    dispatch(getUserData());
                    history.push('/');
                }else{
                    dispatch(errorLogin(res.data.error));
                    return Promise.reject(res.data);
                }
            })
            .catch(err => console.log(err));
        
    }


    function requestLogin(credentials){
        return {
            type: USER_LOGIN_REQUEST,
            payload: credentials
        }
    }

    function receiveLogin(user){
        return {
            type: USER_LOGIN_SUCCESS,
            payload: user
        }
    }

    function errorLogin(err){
        return {
            type: USER_LOGIN_FAILURE,
            payload: err
        }
    }
}

export function logoutUser(){
    return dispatch => {
        dispatch(requestLogout())

        try {
            dispatch(receiveLogout());
            history.push('/');
        }
        catch(err){
            dispatch(errorLogout({err: "ERR during logout"}));
        }
    }


    function requestLogout(){
        return {
            type: USER_LOGOUT_REQUEST
        }
    }

    function receiveLogout(){
        return {
            type: USER_LOGOUT_SUCCESS
        }
    }

    function errorLogout(err){
        return {
            type: USER_LOGOUT_FAILURE,
            payload: err
        }
    }
}

export function getUserData(){
    const token = localStorage.getItem('jwt');
    return dispatch => {
        dispatch(requestData(token));
        
        axios
            .post(API_URL+'/auth/authenticate', {token: token})
            .then(res => {
                if(res.status===200){
                    dispatch(receiveData(res.data));
                    
                }else{
                    dispatch(errorData(res.data.error));
                    return Promise.reject(res.data);
                }
            })
            .catch(err => console.log(err));
        
    }


    function requestData(token){
        return {
            type: USER_DATA_FETCH_REQUEST,
            payload: token
        }
    }

    function receiveData(user){
        return {
            type: USER_DATA_FETCH_SUCCESS,
            payload: user
        }
    }

    function errorData(err){
        return {
            type: USER_DATA_FETCH_FAILURE,
            payload: err
        }
    }
}