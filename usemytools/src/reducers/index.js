import { combineReducers } from 'redux';
import users from './users';
import items from './items';

export default combineReducers({
    users,
    items
});