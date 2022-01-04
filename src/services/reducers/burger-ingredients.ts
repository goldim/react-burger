import { TDataItems } from '../../types/data-item-format';
import { TBurgerIngredientsActions } from '../actions/burger-ingredients';
import { 
    CHANGE_CURRENT_INGREDIENT,
    LOAD_INGREDIENTS,
    LOAD_INGREDIENTS_FAILED,
    LOAD_INGREDIENTS_SUCCESS,
    CLEAR_CURRENT_INGREDIENT,
    CHANGE_CURRENT_CATEGORY_BY_DISTANCE,
    ADD_CATEGORY_ID,
    CHANGE_CURRENT_CATEGORY_BY_ID
} from '../constants/burger-ingredients';

type TCurrentIngredient = {

}

type TBurgerIngredientsState = {
    ingredients: TDataItems,
    currentIngredient: TCurrentIngredient,
    currentCategory: undefined | string,
    categoryIds: string[],
    isLoading: boolean,
    loadingFailed: boolean
}

const initialState: TBurgerIngredientsState = {
    ingredients: [],
    currentIngredient: {},
    currentCategory: undefined,
    categoryIds: [],
    isLoading: false,
    loadingFailed: false
}

const getCategoryByDistance = (ids: string[], distance: number) => {
    let min = 99999;
    let current;
    const doc: any = document;
    ids.forEach((id: string) => {
        const d = Math.abs(distance - doc.getElementById(id).getBoundingClientRect().y);
        if (d < min){
            min = d;
            current = id;
        }
    });
    return current;
}

export const BurgerIngredientsReducer = (state: TBurgerIngredientsState = initialState, action: TBurgerIngredientsActions) => {
    switch (action.type){
        case LOAD_INGREDIENTS:
            return {
                ...state,
                isLoading: true,
                loadingFailed: false
            }
        case LOAD_INGREDIENTS_FAILED:
            return {
                ...state,
                isLoading: false,
                loadingFailed: true
            }
        case LOAD_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredients: action.ingredients,
                isLoading: false,
                loadingFailed: false
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