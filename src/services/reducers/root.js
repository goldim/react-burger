import { combineReducers } from 'redux';

import { LoadIngredientsReducer } from './load-ingredients'
import { BurgerConstructorReducer } from './burger-constructor';

export const rootReducer = combineReducers({
    loadAPI: LoadIngredientsReducer,
    burgerConstruct: BurgerConstructorReducer
});