import { combineReducers } from 'redux';

const todoList = (state = [], action) => { return state; }
const user = (state = [], action) => { return state; }
const collaboration = (state = [], action) => { return state; }

export const rootReducer = combineReducers({
    todoList, user, collaboration
});