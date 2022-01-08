import { TOrderActions } from '../actions/order';
import {
    START_FETCHING_ORDERS,
    NEW_ORDER_CAME
} from '../constants/order';
import { TOrders } from '../types/order';

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
            if (state.orders.some(order => order.id === action.order.id)){
                let order = state.orders.find(order => order.id === action.order.id)
                if (order && order.status !== action.order.status){
                    order.status = action.order.status;
                }
                return state;
            } else {
                return {
                    ...state,
                    orders: [...state.orders, action.order]
                };
            }
        default:
            return state;
    }
};