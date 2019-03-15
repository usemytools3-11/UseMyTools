import {
    // ERROR
    USERS_FETCH_REQUEST,
    USERS_FETCH_SUCCESS,
    USERS_FETCH_FAILURE,
    USER_FETCH_REQUEST,
    USER_FETCH_SUCCESS,
    USER_FETCH_FAILURE,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAILURE,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAILURE
} from '../constants/actionTypes';

import axios from 'axios';
import { API_URL } from '../constants/config';
import { history } from '../';
import { logoutUser } from './auth';

export function fetchUsers(){
    return dispatch => {
        dispatch(requestFetch())
        axios
            .get(API_URL+`/users/`, {headers: {authorization: localStorage.getItem('jwt')}})
            .then(res => {
                if(res.status===200){
                    dispatch(receiveFetch(res.data));
                }else{
                    dispatch(errorFetch(res.data.error));
                    return Promise.reject(res.data);
                }
            })
            .catch(err => console.log(err));
    }


    function requestFetch(){
        return {
            type: USERS_FETCH_REQUEST,
        }
    }

    function receiveFetch(users){
        return {
            type: USERS_FETCH_SUCCESS,
            payload: users
        }
    }

    function errorFetch(err){
        return {
            type: USERS_FETCH_FAILURE,
            payload: err
        }
    }
}

export function fetchUser(id){
    return dispatch => {
        dispatch(requestFetch(id))
        axios
            .get(API_URL+`/users/${id}`, {headers: {authorization: localStorage.getItem('jwt')}})
            .then(res => {
                if(res.status===200){
                    dispatch(receiveFetch(res.data));
                }else{
                    dispatch(errorFetch(res.data.error));
                    return Promise.reject(res.data);
                }
            })
            .catch(err => console.log(err));
    }


    function requestFetch(id){
        return {
            type: USER_FETCH_REQUEST,
            payload: id
        }
    }

    function receiveFetch(user){
        return {
            type: USER_FETCH_SUCCESS,
            payload: user
        }
    }

    function errorFetch(err){
        return {
            type: USER_FETCH_FAILURE,
            payload: err
        }
    }
}


export function updateUser(user){
    return dispatch => {
        dispatch(requestUpdate(user))
        axios
            .put(API_URL+`/users/${user.id}`, user, {headers: {authorization: localStorage.getItem('jwt')}})
            .then(res => {
                if(res.status===200){
                    dispatch(receiveUpdate(res.data));
                    history.push('/profile');
                }else{
                    dispatch(errorUpdate(res.data.error));
                    return Promise.reject(res.data);
                }
            })
            .catch(err => console.log(err));
    }


    function requestUpdate(user){
        return {
            type: USER_UPDATE_REQUEST,
            payload: user
        }
    }

    function receiveUpdate(user){
        return {
            type: USER_UPDATE_SUCCESS,
            payload: user
        }
    }

    function errorUpdate(err){
        return {
            type: USER_UPDATE_FAILURE,
            payload: err
        }
    }
}

export function deleteUser(id){
    return dispatch => {
        dispatch(requestDelete(id))
        axios
            .delete(API_URL+`/users/${id}`, {headers: {authorization: localStorage.getItem('jwt')}})
            .then(res => {
                if(res.status===200){
                    dispatch(receiveDelete(id));
                    dispatch(logoutUser());
                    history.push('/');
                }else{
                    dispatch(errorDelete(res.data.error));
                    return Promise.reject(res.data);
                }
            })
            .catch(err => console.log(err));
    }


    function requestDelete(id){
        return {
            type: USER_DELETE_REQUEST,
            payload: id
        }
    }

    function receiveDelete(id){
        return {
            type: USER_DELETE_SUCCESS,
            payload: id
        }
    }

    function errorDelete(err){
        return {
            type: USER_DELETE_FAILURE,
            payload: err
        }
    }
}
