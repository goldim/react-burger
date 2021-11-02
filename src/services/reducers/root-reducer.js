import { combineReducers } from 'redux';

import { LoadIngredientsReducer } from '../reducers/load-ingredients-reducer'

export const rootReducer = combineReducers({
    loadAPI: LoadIngredientsReducer
});