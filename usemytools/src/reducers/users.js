import {
    ERROR,
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

const initialState = {
    users: [],
    user: null,
    isFetching: false,
    error: null
}

export default (state = initialState, action) => {
    switch(action.type){
        case USERS_FETCH_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        
        case USERS_FETCH_SUCCESS:
            return {
                ...state,
                isFetching: false,
                users: action.payload
            }
        
        case USERS_FETCH_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }
        
        case USER_FETCH_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        
        case USER_FETCH_SUCCESS:
            return {
                ...state,
                isFetching: false,
                user: action.payload
            }
        
        case USER_FETCH_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }

        case USER_UPDATE_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        
        case USER_UPDATE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                user: action.payload
            }
        
        case USER_UPDATE_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }
        
        case USER_DELETE_REQUEST:
            return {
                ...state
            }
        
        case USER_DELETE_SUCCESS:
            return {
                ...state,
                user: null
            }
        
        case USER_DELETE_FAILURE:
            return {
                ...state,
                error: action.payload
            }

        case ERROR:
            return {
                ...state,
                err: action.payload
            }

        default:
            return state;
    }
}
