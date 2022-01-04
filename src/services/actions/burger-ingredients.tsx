import { TDataItems } from "../../utils/data-item-format";
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

export interface ILoadIngredientsFailedAction {
    readonly type: typeof LOAD_INGREDIENTS_FAILED;
}

export interface ILoadIngredientsSuccessAction {
    readonly type: typeof LOAD_INGREDIENTS_SUCCESS;
    ingredients: TDataItems
}

export interface IChangeCurrentIngredientAction {
    readonly type: typeof CHANGE_CURRENT_INGREDIENT;
    id: string;
}

export interface IClearCurrentIngredientAction {
    readonly type: typeof CLEAR_CURRENT_INGREDIENT;
}

export interface IChangeCurrentCategoryByDistanceAction {
    readonly type: typeof CHANGE_CURRENT_CATEGORY_BY_DISTANCE;
    distance: number;
}

export interface IChangeCurrentCategoryByIdAction {
    readonly type: typeof CHANGE_CURRENT_CATEGORY_BY_ID;
    id: string
}

export interface IAddCategoryIdAction {
    readonly type: typeof ADD_CATEGORY_ID;
    id: string
}

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