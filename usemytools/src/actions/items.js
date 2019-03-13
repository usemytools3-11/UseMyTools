import {
    // ERROR,
    ITEM_FETCH_REQUEST,
    ITEM_FETCH_SUCCESS,
    ITEM_FETCH_FAILURE,
    ITEMS_FETCH_REQUEST,
    ITEMS_FETCH_SUCCESS,
    ITEMS_FETCH_FAILURE,
    ITEM_ADD_REQUEST,
    ITEM_ADD_SUCCESS,
    ITEM_ADD_FAILURE,
    ITEM_UPDATE_REQUEST,
    ITEM_UPDATE_SUCCESS,
    ITEM_UPDATE_FAILURE,
    ITEM_DELETE_REQUEST,
    ITEM_DELETE_SUCCESS,
    ITEM_DELETE_FAILURE,
    ITEM_BORROW_REQUEST,
    ITEM_BORROW_SUCCESS,
    ITEM_BORROW_FAILURE,
    ITEM_BORROW_DELETE_REQUEST,
    ITEM_BORROW_DELETE_SUCCESS,
    ITEM_BORROW_DELETE_FAILURE
} from '../constants/actionTypes';
import axios from 'axios';
import { API_URL } from '../constants/config';
import { history } from '../';

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
        
        return axios
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

export function addNewTool(tool){
    return dispatch => {
        dispatch(requestAddNewTool());
        
        axios
            .post(API_URL+'/tools/', tool, {headers: {authorization: localStorage.getItem('jwt')}})
            .then(res => {
                if(res.status===201){
                    // console.log(res.data);
                    dispatch(receiveAddNewTool(res.data.tool));
                    history.push(`/tools/${res.data.tool.id}`);
                }else{
                    dispatch(errorAddNewTool(res.data.error));
                    return Promise.reject(res.data.tool);
                }
            })
            .catch(err => console.log(err));
    }


    function requestAddNewTool(){
        return {
            type: ITEM_ADD_REQUEST
        }
    }

    function receiveAddNewTool(item){
        return {
            type: ITEM_ADD_SUCCESS,
            payload: item
        }
    }

    function errorAddNewTool(err){
        return {
            type: ITEM_ADD_FAILURE,
            payload: err
        }
    }
}

export function updateTool(tool){
    return dispatch => {
        dispatch(requestUpdateTool());
        
        axios
            .put(API_URL+`/tools/${tool.id}`, {...tool}, {headers: {authorization: localStorage.getItem('jwt')}})
            .then(res => {
                console.log(res);
                if(res.status===200){
                    // to be updated
                    dispatch(receiveUpdateTool(res.data[0]));
                    history.push(`/tools/${tool.id}`);
                }else{
                    dispatch(errorUpdateTool(res.data.error));
                    return Promise.reject(res.data);
                }
            })
            .catch(err => console.log(err));
    }


    function requestUpdateTool(){
        return {
            type: ITEM_UPDATE_REQUEST
        }
    }

    function receiveUpdateTool(item){
        return {
            type: ITEM_UPDATE_SUCCESS,
            payload: item
        }
    }

    function errorUpdateTool(err){
        return {
            type: ITEM_UPDATE_FAILURE,
            payload: err
        }
    }
}

export function deleteTool(id){
    return dispatch => {
        dispatch(requestDeleteTool());
        
        axios
            .delete(API_URL+`/tools/${id}`, {headers: {authorization: localStorage.getItem('jwt')}})
            .then(res => {
                if(res.status===200){
                    dispatch(receiveDeleteTool(id));
                    history.push('/tools');
                }else{
                    dispatch(errorDeleteTool(res.data.error));
                    return Promise.reject(res.data);
                }
            })
            .catch(err => console.log(err));
    }


    function requestDeleteTool(){
        return {
            type: ITEM_DELETE_REQUEST
        }
    }

    function receiveDeleteTool(id){
        return {
            type: ITEM_DELETE_SUCCESS,
            payload: id
        }
    }

    function errorDeleteTool(err){
        return {
            type: ITEM_DELETE_FAILURE,
            payload: err
        }
    }
}

export function borrowTool(borrowData){
    return dispatch => {
        dispatch(requestBorrowTool());
        
        axios
            .post(API_URL+'/lent-tools/', borrowData, {headers: {authorization: localStorage.getItem('jwt')}})
            .then(res => {
                console.log(res.data);
                if(res.status===200){
                    dispatch(receiveBorrowTool(res.data));
                    history.push('/profile/');
                }else{
                    dispatch(errorBorrowTool(res.data.error));
                    return Promise.reject(res.data);
                }
            })
            .catch(err => console.log(err));
    }


    function requestBorrowTool(){
        return {
            type: ITEM_BORROW_REQUEST
        }
    }

    function receiveBorrowTool(order){
        return {
            type: ITEM_BORROW_SUCCESS,
            payload: order
        }
    }

    function errorBorrowTool(err){
        return {
            type: ITEM_BORROW_FAILURE,
            payload: err
        }
    }
}

export function deleteToolBorrowing(id){
    return dispatch => {
        dispatch(requestBorrowDeleteTool());
        
        axios
            .delete(API_URL+`/lent-tools/${id}`, {headers: {authorization: localStorage.getItem('jwt')}})
            .then(res => {
                if(res.status===200){
                    dispatch(receiveBorrowDeleteTool(res.data));
                    history.push('/profile/');
                }else{
                    dispatch(errorBorrowDeleteTool(res.data.error));
                    return Promise.reject(res.data);
                }
            })
            .catch(err => console.log(err));
    }


    function requestBorrowDeleteTool(){
        return {
            type: ITEM_BORROW_DELETE_REQUEST
        }
    }

    function receiveBorrowDeleteTool(item){
        return {
            type: ITEM_BORROW_DELETE_SUCCESS,
            payload: item
        }
    }

    function errorBorrowDeleteTool(err){
        return {
            type: ITEM_BORROW_DELETE_FAILURE,
            payload: err
        }
    }
}