import { CHANGE_CURRENT_INGREDIENT, LOAD_INGREDIENTS, CLEAR_CURRENT_INGREDIENT, CHANGE_CURRENT_CATEGORY_BY_DISTANCE, ADD_CATEGORY_ID, CHANGE_CURRENT_CATEGORY_BY_ID } from '../actions/burger-ingredients';

const initialState = {
    ingredients: [],
    currentIngredient: {},
    currentCategory: undefined,
    categoryIds: []
}

const getCategoryByDistance = (ids, distance) => {
    let min = 99999;
    let current;
    ids.forEach(id => {
        const d = Math.abs(distance - document.getElementById(id).getBoundingClientRect().y);
        if (d < min){
            min = d;
            current = id;
        }
    });
    return current;
}

export const BurgerIngredientsReducer = (state = initialState, action) => {
    switch (action.type){
        case LOAD_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients
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
        case ADD_CATEGORY_ID: {
            if (state.categoryIds.includes(action.id)){
                return state;
            }
            return {
                ...state,
                categoryIds: [
                    ...state.categoryIds,
                    action.id
                ]
            };
        }
        case CHANGE_CURRENT_CATEGORY_BY_DISTANCE:
            return {
                ...state,
                currentCategory: getCategoryByDistance(state.categoryIds, action.distance)
            };
        case CHANGE_CURRENT_CATEGORY_BY_ID:
            return {
                ...state,
                currentCategory: action.id
            };
        default:
            return state;
    }
}