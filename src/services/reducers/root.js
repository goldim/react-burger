import { combineReducers } from 'redux';

import { BurgerIngredientsReducer } from './burger-ingredients'
import { BurgerConstructorReducer } from './burger-constructor';

export const rootReducer = combineReducers({
    ingredientsReducer: BurgerIngredientsReducer,
    burgerConstruct: BurgerConstructorReducer
});