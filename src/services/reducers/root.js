import { combineReducers } from 'redux';

import { BurgerIngredientsReducer } from './burger-ingredients'
import { BurgerConstructorReducer } from './burger-constructor';
import { AuthReducer } from './auth';

export const rootReducer = combineReducers({
    authReducer: AuthReducer,
    ingredientsReducer: BurgerIngredientsReducer,
    burgerConstruct: BurgerConstructorReducer
});