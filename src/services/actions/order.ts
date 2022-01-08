import {
    START_FETCHING_ORDERS,
    NEW_ORDER_CAME,
} from '../constants/order';
import { IOrder } from '../types/order';

interface IStartFetchingOrdersAction {
    readonly type: typeof START_FETCHING_ORDERS
};

interface INewOrderCameAction {
    readonly type: typeof NEW_ORDER_CAME,
    order: IOrder
};

export type TOrderActions = 
    | IStartFetchingOrdersAction
    | INewOrderCameAction
    ;