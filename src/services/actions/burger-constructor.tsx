import { 
    ADD_BUN,
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    MOVE_INGREDIENT,
    MAKE_ORDER,
    MAKE_ORDER_FAILED,
    MAKE_ORDER_SUCCESS,
    NEW_ORDER
} from "../constants/burger-constructor";

export interface IAddBunAction {
    readonly type: typeof ADD_BUN;
}

export interface IAddIngredientAction {
    readonly type: typeof ADD_INGREDIENT;
}

export interface IRemoveIngredientAction {
    readonly type: typeof REMOVE_INGREDIENT;
}

export interface IMoveIngredientAction {
    readonly type: typeof MOVE_INGREDIENT;
}

export interface IMakeOrderAction {
    readonly type: typeof MAKE_ORDER;
}

export interface IMakeOrderFailedAction {
    readonly type: typeof MAKE_ORDER_FAILED;
}

export interface IMakeOrderSuccessAction {
    readonly type: typeof MAKE_ORDER_SUCCESS;
}

export interface INewOrderAction {
    readonly type: typeof NEW_ORDER;
}

export type TAuthActions = 
    | IAddBunAction
    | IAddIngredientAction
    | IRemoveIngredientAction
    | IMoveIngredientAction
    | IMakeOrderAction
    | IMakeOrderFailedAction
    | IMakeOrderSuccessAction
    | INewOrderAction
    ;