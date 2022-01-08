import { combineReducers } from 'redux';

import { BurgerIngredientsReducer } from './burger-ingredients'
import { BurgerConstructorReducer } from './burger-constructor';
import { AuthReducer } from './auth';
import { wsReducer } from './websocket';
import { OrderReducer } from './order';

export const rootReducer = combineReducers({
    authReducer: AuthReducer,
    ingredientsReducer: BurgerIngredientsReducer,
    burgerConstruct: BurgerConstructorReducer,
    websocket: wsReducer,
    order: OrderReducer
});