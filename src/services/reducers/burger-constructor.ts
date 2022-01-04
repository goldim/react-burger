import {
    NEW_ORDER,
    MAKE_ORDER,
    MAKE_ORDER_FAILED,
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    ADD_BUN,
    MOVE_INGREDIENT,
    MAKE_ORDER_SUCCESS
} from '../constants/burger-constructor'

import { TBurgerConstructorActions } from '../actions/burger-constructor'

type TCurrentOrder = {
    No?: number;
    success?: boolean; 
}

type TBurgerConstructorState = {
    chosenIngredients: Array<string>,
    hasBun: boolean,
    currentOrder: TCurrentOrder,
    currentOrderFailed: boolean,
    currentOrderIsLoading: boolean
}

const initialState = {
    chosenIngredients: [],
    hasBun: false,
    currentOrder: {},
    currentOrderFailed: false,
    currentOrderIsLoading: false
}

export const BurgerConstructorReducer = (state: TBurgerConstructorState = initialState, action: TBurgerConstructorActions) => {
    switch (action.type){
        case ADD_BUN:
            if (state.hasBun){
                const newIngredients = [...state.chosenIngredients];
                newIngredients.pop();
                newIngredients.shift();
                newIngredients.push(action.id);
                newIngredients.unshift(action.id);
                return {
                    ...state,
                    chosenIngredients: newIngredients
                };
            } else {
                return {
                    ...state,
                    hasBun: true,
                    chosenIngredients: [
                        action.id,
                        ...state.chosenIngredients,
                        action.id
                    ]
                };
            }
        case ADD_INGREDIENT:
            if (state.hasBun){
                const newIngredients = [...state.chosenIngredients];
                newIngredients.splice(state.chosenIngredients.length - 1, 0, action.id);
                return {
                    ...state,
                    chosenIngredients: newIngredients
                };
            } else {
                const newIngredients = [...state.chosenIngredients];
                newIngredients.splice(state.chosenIngredients.length, 0, action.id);
                return {
                    ...state,
                    chosenIngredients: newIngredients
                };
            }
        case MOVE_INGREDIENT: {
            if (state.hasBun){
                const newIngredients = [...state.chosenIngredients];
                let tmp = newIngredients[action.whatIndex + 1];
                newIngredients.splice(action.whatIndex + 1, 1);
                newIngredients.splice(action.whereIndex + 1, 0, tmp);
                return {
                    ...state,
                    chosenIngredients: newIngredients
                };
            } else {
                const newIngredients = [...state.chosenIngredients];
                let tmp = newIngredients[action.whatIndex];
                newIngredients.splice(action.whatIndex, 1);
                newIngredients.splice(action.whereIndex, 0, tmp);
                return {
                    ...state,
                    chosenIngredients: newIngredients
                };
            }
        }
        case REMOVE_INGREDIENT:
            const newIngredients = [...state.chosenIngredients];
            newIngredients.splice(action.index + 1, 1);
            return {
                ...state,
                chosenIngredients: newIngredients
            };
        case MAKE_ORDER:
            return {
                ...state,
                currentOrderIsLoading: true,
                currentOrderFailed: false
            };
        case MAKE_ORDER_SUCCESS:
            return {
                ...state,
                currentOrder: {
                    No: action.No,
                    success: action.success
                },
                currentOrderIsLoading: false,
                currentOrderFailed: false,
                chosenIngredients: [],
                hasBun: false
            };
        case MAKE_ORDER_FAILED:
            return {
                ...state,
                currentOrderIsLoading: false,
                currentOrderFailed: true
            };
        case NEW_ORDER:
            return {
                ...state,
                currentOrder: {},
                currentOrderFailed: false,
                currentOrderIsLoading: false
            };
        default:
            return state;
    }
}