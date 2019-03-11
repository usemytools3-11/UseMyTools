import {
    ERROR,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_REGISTRATION_REQUEST,
    USER_REGISTRATION_SUCCESS
} from '../constants/actionTypes';
import axios from 'axios';
import { API_URL } from '../constants/config';

export function loginUser(credentials){
    return dispatch => {
        dispatch(requestLogin(credentials));

        axios
            .post(API_URL+'/login', credentials)
            .then(res =>
                res
                    .json()
                    .then(user => ({user, res}))
            )
            .then(({user, res}) => {
                if(!res.ok){
                    dispatch(errorLogin(user.message));
                    return Promise.reject(user);
                }else{
                    localStorage.setItem('user_token', user.user_token);
                    dispatch(receiveLogin(user));
                }
            })
            .catch(err => console.log(err));
    }

    function requestLogin(credentials){
        return {
            type: USER_LOGIN_REQUEST,
            isFetching: true,
            isAuthenticated: false,
            credentials
        }
    }

    function receiveLogin(user){
        return {
            type: USER_LOGIN_SUCCESS,
            isFetching: false,
            isAuthenticated: true,
            user_token: user.user_token
        }
    }

    function errorLogin(err){
        return {
            type: USER_LOGIN_FAILURE,
            isFetching: false,
            isAuthenticated: false,
            err
        }
    }
}