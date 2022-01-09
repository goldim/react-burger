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

export const addBun = (id: string): IAddBunAction => ({
    type: ADD_BUN,
    id
});

export interface IAddIngredientAction {
    readonly type: typeof ADD_INGREDIENT;
    id: string;
}

export const addIngredient = (id: string): IAddIngredientAction => ({
    type: ADD_INGREDIENT,
    id
});

export interface IRemoveIngredientAction {
    readonly type: typeof REMOVE_INGREDIENT;
    index: number
}

export const removeIngredient = (index: number): IRemoveIngredientAction => ({
    type: REMOVE_INGREDIENT,
    index
});

export interface IMoveIngredientAction {
    readonly type: typeof MOVE_INGREDIENT;
    whatIndex: number;
    whereIndex: number; 
}

export const moveIngredient = (whatIndex: number, whereIndex: number): IMoveIngredientAction => ({
    type: MOVE_INGREDIENT,
    whatIndex,
    whereIndex
});

export interface IMakeOrderAction {
    readonly type: typeof MAKE_ORDER;
}

export const makeOrder = (): IMakeOrderAction => ({
    type: MAKE_ORDER
});

export interface IMakeOrderFailedAction {
    readonly type: typeof MAKE_ORDER_FAILED;
}

export const makeOrderFailed = (): IMakeOrderFailedAction => ({
    type: MAKE_ORDER_FAILED
});

export interface IMakeOrderSuccessAction {
    readonly type: typeof MAKE_ORDER_SUCCESS;
    No: number;
    success: boolean;
}

export const makeOrderSuccess = (No: number, success: boolean): IMakeOrderSuccessAction => ({
    type: MAKE_ORDER_SUCCESS,
    No,
    success
});

export interface INewOrderAction {
    readonly type: typeof NEW_ORDER;
}

export const newOrder = (): INewOrderAction => ({
    type: NEW_ORDER
});

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