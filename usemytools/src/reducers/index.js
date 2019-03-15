import { combineReducers } from 'redux';
import users from './users';
import items from './items';
import auth from './auth';

export default combineReducers({
    users,
    items,
    auth
});