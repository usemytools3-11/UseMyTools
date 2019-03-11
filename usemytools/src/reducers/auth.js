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
    USER_LOGOUT_FAILURE
} from '../constants/actionTypes';


const initialState = {
    authenticated: false,
    isFetching: false,
    error: null,
    token: null
}

export default (state = initialState, action) => {
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                isFetching: true
            }

        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                authenticated: true
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
            return {
                ...state,
                authenticated: false
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

        default:
            return state;
    }
}
