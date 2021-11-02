import data from '../../utils/data.json'
import { CHANGE_CURRENT_INGREDIENT, LOAD_INGREDIENTS_FROM_SERVER, CLEAR_CURRENT_INGREDIENT } from '../actions/burger-ingredients';

export const loadFake = () => {
    return data;
}
export const BurgerIngredientsReducer = (state = {ingredients: [], currentIngredient: {}}, action) => {
    switch (action.type){
        case LOAD_INGREDIENTS_FROM_SERVER:
            return {
                ...state,
                ingredients: loadFake()
            };
        case CHANGE_CURRENT_INGREDIENT:
            return {
                ...state,
                currentIngredient: {
                    ...state.currentIngredient,
                    ...state.ingredients.find(ingr => ingr._id === action.id)
                }
            };
        case CLEAR_CURRENT_INGREDIENT:
            return {
                ...state,
                currentIngredient: {}
            };
        default:
            return state;
    }
}