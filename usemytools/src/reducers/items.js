import {
    // ERROR,
    ITEMS_FETCH_REQUEST,
    ITEMS_FETCH_SUCCESS,
    ITEMS_FETCH_FAILURE,
    ITEM_FETCH_REQUEST,
    ITEM_FETCH_SUCCESS,
    ITEM_FETCH_FAILURE,
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

const initialState = {
    isFetching: false,
    error: null,
    tools: [],
    tool: null,
    borrowed: []
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

        case ITEM_ADD_REQUEST:
            return {
                ...state
            }

        case ITEM_ADD_SUCCESS:
            return {
                ...state,
                tools: [...state.tools, action.payload]
            }

        case ITEM_ADD_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        
        case ITEM_UPDATE_REQUEST:
            return {
                ...state
            }

        case ITEM_UPDATE_SUCCESS:
            return {
                ...state,
                tools: [...state.tools.filter(elem => elem.id !== action.payload.id), action.payload].sort((a, b) => {
                    if (a.id < b.id) return -1;
                    if (a.id > b.id) return 1;
                    return 0;
                })
            }
            
        case ITEM_UPDATE_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        
        case ITEM_DELETE_REQUEST:
            return {
                ...state
            }

        case ITEM_DELETE_SUCCESS:
            return {
                ...state,
                tools: state.tools.filter(elem => elem.id !== action.payload)
            }
            
        case ITEM_DELETE_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        
        case ITEM_BORROW_REQUEST:
            return {
                ...state
            }

        case ITEM_BORROW_SUCCESS:
            return {
                ...state,
                tools: [...state.tools.filter(elem => elem.id !== action.payload.id), action.payload].sort((a, b) => {
                    if (a.id < b.id) return -1;
                    if (a.id > b.id) return 1;
                    return 0;
                }),
                borrowed: [...state.borrowed, action.payload]
            }
            
        case ITEM_BORROW_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        
        case ITEM_BORROW_DELETE_REQUEST:
            return {
                ...state
            }

        case ITEM_BORROW_DELETE_SUCCESS:
            return {
                ...state,
                borrowed: [...state.borrowed.filter(elem => !elem.action.payload)]
            }
            
        case ITEM_BORROW_DELETE_FAILURE:
            return {
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}
