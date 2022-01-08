import {
    START_FETCHING_ORDERS,
    NEW_ORDER_CAME,
    UPDATE_TOTALS
} from '../constants/order';
import { IOrder } from '../types/order';

interface IStartFetchingOrdersAction {
    readonly type: typeof START_FETCHING_ORDERS
};

interface INewOrderCameAction {
    readonly type: typeof NEW_ORDER_CAME,
    order: IOrder
};

interface IUpdateTotalsAction {
    readonly type: typeof UPDATE_TOTALS,
    total: number,
    todayTotal: number
};

export type TOrderActions = 
    | IStartFetchingOrdersAction
    | INewOrderCameAction
    | IUpdateTotalsAction
    ;