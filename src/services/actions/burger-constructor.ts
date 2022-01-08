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
    id: string
}

export interface IAddIngredientAction {
    readonly type: typeof ADD_INGREDIENT;
    id: string;
}

export interface IRemoveIngredientAction {
    readonly type: typeof REMOVE_INGREDIENT;
    index: number
}

export interface IMoveIngredientAction {
    readonly type: typeof MOVE_INGREDIENT;
    whatIndex: number;
    whereIndex: number; 
}

export interface IMakeOrderAction {
    readonly type: typeof MAKE_ORDER;
}

export interface IMakeOrderFailedAction {
    readonly type: typeof MAKE_ORDER_FAILED;
}

export interface IMakeOrderSuccessAction {
    readonly type: typeof MAKE_ORDER_SUCCESS;
    No: number;
    success: boolean;
}

export interface INewOrderAction {
    readonly type: typeof NEW_ORDER;
}

export type TBurgerConstructorActions = 
    | IAddBunAction
    | IAddIngredientAction
    | IRemoveIngredientAction
    | IMoveIngredientAction
    | IMakeOrderAction
    | IMakeOrderFailedAction
    | IMakeOrderSuccessAction
    | INewOrderAction
    ;