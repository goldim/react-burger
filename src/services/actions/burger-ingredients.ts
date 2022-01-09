import { TDataItems } from "../types/data-item-format";
import { 
    LOAD_INGREDIENTS,
    LOAD_INGREDIENTS_FAILED,
    LOAD_INGREDIENTS_SUCCESS,
    CHANGE_CURRENT_INGREDIENT,
    CLEAR_CURRENT_INGREDIENT,
    CHANGE_CURRENT_CATEGORY_BY_DISTANCE,
    CHANGE_CURRENT_CATEGORY_BY_ID,
    ADD_CATEGORY_ID
} from "../constants/burger-ingredients";

export interface ILoadIngredientsAction {
    readonly type: typeof LOAD_INGREDIENTS;
}

export const loadIngredients = (): ILoadIngredientsAction => ({
    type: LOAD_INGREDIENTS
})

export interface ILoadIngredientsFailedAction {
    readonly type: typeof LOAD_INGREDIENTS_FAILED;
}

export const loadIngredientsFailed = (): ILoadIngredientsFailedAction => ({
    type: LOAD_INGREDIENTS_FAILED
})

export interface ILoadIngredientsSuccessAction {
    readonly type: typeof LOAD_INGREDIENTS_SUCCESS;
    ingredients: TDataItems
}

export const loadIngredientsSuccess = (ingredients: TDataItems): ILoadIngredientsSuccessAction => ({
    type: LOAD_INGREDIENTS_SUCCESS,
    ingredients
})

export interface IChangeCurrentIngredientAction {
    readonly type: typeof CHANGE_CURRENT_INGREDIENT;
    id: string;
}

export const changeCurrentIngredient = (id: string): IChangeCurrentIngredientAction => ({
    type: CHANGE_CURRENT_INGREDIENT,
    id
})

export interface IClearCurrentIngredientAction {
    readonly type: typeof CLEAR_CURRENT_INGREDIENT;
}

export const clearCurrentIngredient = (): IClearCurrentIngredientAction => ({
    type: CLEAR_CURRENT_INGREDIENT
})

export interface IChangeCurrentCategoryByDistanceAction {
    readonly type: typeof CHANGE_CURRENT_CATEGORY_BY_DISTANCE;
    distance: number;
}

export const changeCurrentCategoryByDistance = (distance: number): IChangeCurrentCategoryByDistanceAction => ({
    type: CHANGE_CURRENT_CATEGORY_BY_DISTANCE,
    distance
})

export interface IChangeCurrentCategoryByIdAction {
    readonly type: typeof CHANGE_CURRENT_CATEGORY_BY_ID;
    id: string
}

export const changeCurrentCategoryById = (id: string): IChangeCurrentCategoryByIdAction => ({
    type: CHANGE_CURRENT_CATEGORY_BY_ID,
    id
})

export interface IAddCategoryIdAction {
    readonly type: typeof ADD_CATEGORY_ID;
    id: string
}

export const addCategoryId = (id: string): IAddCategoryIdAction => ({
    type: ADD_CATEGORY_ID,
    id
})

export type TBurgerIngredientsActions = 
    | ILoadIngredientsAction
    | ILoadIngredientsFailedAction
    | ILoadIngredientsSuccessAction
    | IChangeCurrentIngredientAction
    | IClearCurrentIngredientAction
    | IChangeCurrentCategoryByDistanceAction
    | IChangeCurrentCategoryByIdAction
    | IAddCategoryIdAction
    ;