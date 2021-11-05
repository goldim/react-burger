import { NEW_ORDER, ORDER_MADE, ADD_INGREDIENT, REMOVE_INGREDIENT, ADD_BUN, MOVE_INGREDIENT } from '../actions/burger-constructor'

const initialState = {
    chosenIngredients: [],
    hasBun: false,
    currentOrder: {}
}

export const BurgerConstructorReducer = (state = initialState, action) => {
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
                return state;
            }
        case MOVE_INGREDIENT: {
            const newIngredients = [...state.chosenIngredients];
            let tmp = newIngredients[action.whatIndex + 1];
            newIngredients.splice(action.whatIndex + 1, 1);
            newIngredients.splice(action.whereIndex + 1, 0, tmp);
            return {
                ...state,
                chosenIngredients: newIngredients
            };
        }
        case REMOVE_INGREDIENT:
            const newIngredients = [...state.chosenIngredients];
            newIngredients.splice(action.index + 1, 1);
            return {
                ...state,
                chosenIngredients: newIngredients
            };
        case ORDER_MADE:
            return {
                ...state,
                currentOrder: {
                    No: action.No,
                    success: action.success
                }
            };
        case NEW_ORDER:
            return {
                ...state,
                currentOrder: {}
            };
        default:
            return state;
    }
}