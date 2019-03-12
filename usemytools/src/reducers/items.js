import {
    // ERROR,
    ITEMS_FETCH_REQUEST,
    ITEMS_FETCH_SUCCESS,
    ITEMS_FETCH_FAILURE,
    ITEM_FETCH_REQUEST,
    ITEM_FETCH_SUCCESS,
    ITEM_FETCH_FAILURE
} from '../constants/actionTypes';

const initialState = {
    isFetching: false,
    error: null,
    tools: [],
    tool: null
}

export default (state = initialState, action) => {
    switch(action.type){
        case ITEMS_FETCH_REQUEST:
            return {
                ...state,
                isFetching: true
            }

        case ITEMS_FETCH_SUCCESS:
            return {
                ...state,
                isFetching: false,
                tools: action.payload.tools
            }

        case ITEMS_FETCH_FAILURE:
            return {
                ...state,
                isFetching: false
            }
        
        case ITEM_FETCH_REQUEST:
            return {
                ...state,
                isFetching: true
            }

        case ITEM_FETCH_SUCCESS:
            return {
                ...state,
                isFetching: false,
                tool: action.payload
            }

        case ITEM_FETCH_FAILURE:
            return {
                ...state,
                isFetching: false
            }

        default:
            return state;
    }
}
