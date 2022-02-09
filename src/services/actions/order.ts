import {
    START_FETCHING_ORDERS,
    NEW_ORDER_CAME,
    UPDATE_TOTALS,
    CLEAR_ORDERS
} from '../constants/order';
import { IServerOrderReply } from '../types/order';

export interface IStartFetchingOrdersAction {
    readonly type: typeof START_FETCHING_ORDERS
};

export const startFetchingOrders = (): IStartFetchingOrdersAction => ({
    type: START_FETCHING_ORDERS,
})

export interface INewOrderCameAction {
    readonly type: typeof NEW_ORDER_CAME,
    payload: IServerOrderReply
};

export const newOrderCame = (payload: IServerOrderReply): INewOrderCameAction => ({
    type: NEW_ORDER_CAME,
    payload
})

interface IUpdateTotalsAction {
    readonly type: typeof UPDATE_TOTALS,
    total: number,
    totalToday: number
};

export const updateTotals = (total: number, totalToday: number): IUpdateTotalsAction => ({
    type: UPDATE_TOTALS,
    total,
    totalToday
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