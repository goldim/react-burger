import { TDataItems } from '../types/data-item-format';
import { AppDispatch } from '../types';
import Cookies from 'js-cookie';
import { IServerOrder, IServerOrderReply } from '../types/order';
import { HTTPS_BASE_URL, WS_BASE_URL } from '../constants';
import { makeOrderFailed, makeOrderGenerator, makeOrderSuccess } from '../actions/burger-constructor';
import { clearOrders, newOrderCame, startFetchingOrders, updateTotals } from '../actions/order';
import { WS_CONNECTION_START } from '../constants/websocket';

const MAKING_ORDER_URL = `${HTTPS_BASE_URL}/api/orders`;

const sentData = async (url: string, items: TDataItems, dispatch: AppDispatch) => {
    dispatch(makeOrderGenerator());
    const data = {"ingredients": items.map(item => item._id)};

    let accessToken = Cookies.get('accessToken');
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': accessToken ? accessToken: ""
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const data = await response.json();
        if (data.success){
            dispatch(makeOrderSuccess(data.order.number, data.success));
        } else {
            dispatch(makeOrderFailed(data.message));
        }
    } else {
        dispatch(makeOrderFailed(response.status.toString()));
    }
}

export const makeOrder = (ingredients: TDataItems) => async (dispatch: AppDispatch)  => {
    try {
        await sentData(MAKING_ORDER_URL, ingredients, dispatch);
    } catch(ex){
        dispatch(makeOrderFailed((ex as Error).message));
    }
}

const FETCH_ALL_ORDERS_URL = `${WS_BASE_URL}/orders/all`;
const FETCH_ORDERS_FOR_USER_URL = `${WS_BASE_URL}/orders`;

const startFetching = async (dispatch: AppDispatch, url: string) => {
    dispatch(startFetchingOrders());
    createSocket(url, dispatch);
}

const onData = (data: IServerOrderReply, dispatch: AppDispatch) => {
    data.orders.forEach((order: IServerOrder) => {
        dispatch(newOrderCame({
            id: order.number,
            fullname: order.name,
            status: order.status,
            createdAt: order.createdAt,
            ingredientIds: order.ingredients
        }));
    });
    dispatch(updateTotals(data.total, data.totalToday));
}

const createSocket = function(url: string, dispatch: AppDispatch){
    dispatch({type: WS_CONNECTION_START, url});
    // let socket = new WebSocket(url);
    
    // socket.onopen = event => {};
    // socket.onerror = event => {};
    // socket.onclose = event => {
    //     dispatch(clearOrders());
    // };

    // socket.onmessage = event => {
    //     const { data } = event;
    //     const parsedData = JSON.parse(data);
    //     const { success, ...restData } = parsedData;
    //     if (success){
    //         onData(restData, dispatch);
    //     }
    // }
}

export const fetchAllOrders = () => async (dispatch: AppDispatch)  => {
    try {
        dispatch(clearOrders());
        await startFetching(dispatch, FETCH_ALL_ORDERS_URL);
    } catch(ex){
    }
}

export const fetchOrdersByUser = () => async (dispatch: AppDispatch)  => {
    try {
        dispatch(clearOrders());
        let token = Cookies.get('accessToken');
        if (token){
            token = token.replace('Bearer', '');
            token = token.trim();
        }
        const url = `${FETCH_ORDERS_FOR_USER_URL}?token=${token}`;
        await startFetching(dispatch, url);
    } catch(ex){
    }
}