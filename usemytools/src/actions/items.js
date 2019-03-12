import {
    // ERROR,
    ITEM_FETCH_REQUEST,
    ITEM_FETCH_SUCCESS,
    ITEM_FETCH_FAILURE,
    ITEMS_FETCH_REQUEST,
    ITEMS_FETCH_SUCCESS,
    ITEMS_FETCH_FAILURE
} from '../constants/actionTypes';
import axios from 'axios';
import { API_URL } from '../constants/config';

export function fetchTools(){
    return dispatch => {
        dispatch(requestFetch());
        
        axios
            .get(API_URL+'/tools/', {headers: {authorization: localStorage.getItem('jwt')}})
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
            type: ITEMS_FETCH_REQUEST
        }
    }

    function receiveFetch(items){
        return {
            type: ITEMS_FETCH_SUCCESS,
            payload: items
        }
    }

    function errorFetch(err){
        return {
            type: ITEMS_FETCH_FAILURE,
            payload: err
        }
    }
}

export function fetchTool(id){
    return dispatch => {
        dispatch(requestFetch());
        
        axios
            .get(API_URL+`/tools/${id}`, {headers: {authorization: localStorage.getItem('jwt')}})
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
            type: ITEM_FETCH_REQUEST
        }
    }

    function receiveFetch(item){
        return {
            type: ITEM_FETCH_SUCCESS,
            payload: item
        }
    }

    function errorFetch(err){
        return {
            type: ITEM_FETCH_FAILURE,
            payload: err
        }
    }
}