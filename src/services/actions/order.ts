import {
    START_FETCHING_ORDERS,
    NEW_ORDER_CAME,
    CHANGE_ORDER_STATUS
} from '../constants/order';
import { IOrder, STATUS } from '../types/order';

interface IStartFetchingOrdersAction {
    readonly type: typeof START_FETCHING_ORDERS
};

interface INewOrderCameAction {
    readonly type: typeof NEW_ORDER_CAME,
    order: IOrder
};

interface IChangeOrderStatusAction {
    readonly type: typeof CHANGE_ORDER_STATUS,
    id: string,
    status: STATUS
};

export type TOrderActions = 
    | IStartFetchingOrdersAction
    | INewOrderCameAction
    | IChangeOrderStatusAction
    ;