import {
    // ERROR
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAILURE
} from '../constants/actionTypes';

import axios from 'axios';
import { API_URL } from '../constants/config';
import { history } from '../';

export function updateUser(user){
    return dispatch => {
        dispatch(requestUpdate(user))
        console.log(user);
        axios
            .put(API_URL+`/users/${user.id}`, user)
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
