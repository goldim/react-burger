import { ADD_INGREDIENT, REMOVE_INGREDIENT, ADD_BUN } from '../actions/burger-constructor'

export const BurgerConstructorReducer = (state = {chosenIngredients: [], hasBun: false }, action) => {
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
        case REMOVE_INGREDIENT:
            const newIngredients = [...state.chosenIngredients];
            console.log(action.index);
            newIngredients.splice(action.index + 1, 1);
            return {
                ...state,
                chosenIngredients: newIngredients
            };
        default:
            return state;
    }
}