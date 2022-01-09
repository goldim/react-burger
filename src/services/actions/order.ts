import {
    START_FETCHING_ORDERS,
    NEW_ORDER_CAME,
    UPDATE_TOTALS,
    CLEAR_ORDERS
} from '../constants/order';
import { IOrder } from '../types/order';

interface IStartFetchingOrdersAction {
    readonly type: typeof START_FETCHING_ORDERS
};

export const startFetchingOrders = (): IStartFetchingOrdersAction => ({
    type: START_FETCHING_ORDERS,
})

interface INewOrderCameAction {
    readonly type: typeof NEW_ORDER_CAME,
    order: IOrder
};

export const newOrderCame = (order: IOrder): INewOrderCameAction => ({
    type: NEW_ORDER_CAME,
    order
})

interface IUpdateTotalsAction {
    readonly type: typeof UPDATE_TOTALS,
    total: number,
    todayTotal: number
};

export const updateTotals = (total: number, todayTotal: number): IUpdateTotalsAction => ({
    type: UPDATE_TOTALS,
    total,
    todayTotal
})

interface IClearOrdersAction {
    readonly type: typeof CLEAR_ORDERS
};

export const clearOrders = (): IClearOrdersAction => ({
    type: CLEAR_ORDERS
})

export type TOrderActions = 
    | IStartFetchingOrdersAction
    | INewOrderCameAction
    | IUpdateTotalsAction
    | IClearOrdersAction
    ;