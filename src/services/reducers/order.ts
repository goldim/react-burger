import { TOrderActions } from '../actions/order';
import {
    START_FETCHING_ORDERS,
    NEW_ORDER_CAME,
    UPDATE_TOTALS,
    CLEAR_ORDERS
} from '../constants/order';
import { IOrder, IServerOrder, TOrders } from '../types/order';

type TOrderState = {
    total: number,
    todayTotal: number,
    orders: TOrders
}

const initialState: TOrderState = {
    total: 0,
    todayTotal: 0,
    orders: []
};

export const OrderReducer = (state: TOrderState = initialState, action: TOrderActions) => {
    switch (action.type) {
        case START_FETCHING_ORDERS:
            return {
                ...state,
            };

        case NEW_ORDER_CAME:
            const data = action.payload as {
                orders: IServerOrder[],
                total: number,
                totalToday: number
            };

            const newOrders: IOrder[] = [];

            data.orders.forEach((order: IServerOrder) => {
                const hasOrder = state.orders.some(stateOrder => {
                    return stateOrder.id === order.number
                });

                if (hasOrder){
                    let stateOrder = state.orders.find(stOrder => stOrder.id === order.number)
                    if (stateOrder && stateOrder.status !== order.status){
                        stateOrder.status = order.status;
                        newOrders.push(stateOrder);
                    }
                } else {
                    newOrders.push({
                        id: order.number,
                        fullname: order.name,
                        status: order.status,
                        createdAt: order.createdAt,
                        ingredientIds: order.ingredients
                    });
                }

            });

            return {...state, orders: [...state.orders, ...newOrders], total: data.total, todayTotal: data.totalToday};

        case UPDATE_TOTALS:
            return {
                ...state,
                total: action.total,
                todayTotal: action.todayTotal
            };

        case CLEAR_ORDERS:
            return {...initialState};

        default:
            return state;
    }
};