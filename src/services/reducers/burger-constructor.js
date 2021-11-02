import { ADD_INGREDIENT } from '../actions/burger-constructor'
import { REMOVE_INGREDIENT } from '../actions/burger-constructor'

export const BurgerConstructorReducer = (state = {chosenIngredients: []}, action) => {
    switch (action.type){
        case ADD_INGREDIENT:
            return {
                ...state,
                chosenIngredients: [
                    ...state.chosenIngredients,
                    action.id
                ]
            };
        case REMOVE_INGREDIENT:
            return {
                ...state,
                chosenIngredients: state.chosenIngredients.filter(id => id !== action.id)
            };
        default:
            return state;
    }
}