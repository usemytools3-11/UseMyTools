import {
    ERROR,
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

const initialState = {
    authenticated: localStorage.getItem('jwt-authenticated') || false,
    isFetching: false,
    error: null,
    token: localStorage.getItem('jwt') || null,
    user: null
}

export default (state = initialState, action) => {
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                isFetching: true
            }

        case USER_LOGIN_SUCCESS:
            localStorage.setItem('jwt', action.payload.token);
            localStorage.setItem('jwt-authenticated', true);
            return {
                ...state,
                isFetching: false,
                token: localStorage.getItem('jwt') || null,
                authenticated: localStorage.getItem('jwt-authenticated') || false
            }

        case USER_LOGIN_FAILURE:
            return {
                ...state,
                isFetching: false,
                authenticated: false
            }
        
        
        case USER_REGISTRATION_REQUEST:
            return {
                ...state,
                isFetching: true
            }

        case USER_REGISTRATION_SUCCESS:
            return {
                ...state,
                isFetching: false
            }

        case USER_REGISTRATION_FAILURE:
            return {
                ...state,
                isFetching: false
            }

        case USER_LOGOUT_REQUEST:
            return {
                ...state
            }
        
        case USER_LOGOUT_SUCCESS:
            localStorage.removeItem('jwt');
            localStorage.removeItem('jwt-authenticated');
            return {
                ...state,
                token: localStorage.getItem('jwt') || null,
                authenticated: localStorage.getItem('jwt-authenticated') || false
            }

        case USER_LOGOUT_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        
        case ERROR:
            return {
                ...state,
                error: action.payload
            }
        
        case USER_DATA_FETCH_REQUEST:
            return {
                ...state,
                isFetching: true
            }

        case USER_DATA_FETCH_SUCCESS:
            return {
                ...state,
                isFetching: false,
                user: action.payload[0]
            }

        case USER_DATA_FETCH_FAILURE:
            return {
                ...state,
                isFetching: false,
            }

        default:
            return state;
    }
}
