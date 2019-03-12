import {
    ERROR
} from '../constants/actionTypes';

const initialState = {
    
}

export default (state = initialState, action) => {
    switch(action.type){
        
        case ERROR:
            return {
                ...state,
                err: action.payload
            }

        default:
            return state;
    }
}
