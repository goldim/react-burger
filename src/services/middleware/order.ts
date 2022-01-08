import { MAKE_ORDER, MAKE_ORDER_FAILED, MAKE_ORDER_SUCCESS } from '../constants/burger-constructor';
import { TDataItems } from '../types/data-item-format';
import { AppDispatch } from '../types';
import { CLEAR_ORDERS, NEW_ORDER_CAME, START_FETCHING_ORDERS, UPDATE_TOTALS } from '../constants/order';
import Cookies from 'js-cookie';

const MAKING_ORDER_URL = "https://norma.nomoreparties.space/api/orders";

const sentData = async (url: string, items: TDataItems, dispatch: AppDispatch) => {
    dispatch({ type: MAKE_ORDER });
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
            dispatch({
                type: MAKE_ORDER_SUCCESS,
                No: data.order.number,
                success: data.success
            });
        } else {
            dispatch({
                type: MAKE_ORDER_FAILED,
                message: data.message
            });
        }
    } else {
        dispatch({
            type: MAKE_ORDER_FAILED,
            message: response.status.toString()
        });
    }
}

export const makeOrder = (ingredients: TDataItems) => async (dispatch: AppDispatch)  => {
    try {
        await sentData(MAKING_ORDER_URL, ingredients, dispatch);
    } catch(ex){
        dispatch({
            type: MAKE_ORDER_FAILED,
            message: (ex as Error).message
        });
    }
}

const FETCH_ALL_ORDERS_URL = 'wss://norma.nomoreparties.space/orders/all';
const FETCH_ORDERS_FOR_USER_URL = 'wss://norma.nomoreparties.space/orders';

const startFetching = async (dispatch: AppDispatch, url: string) => {
    dispatch({ type: START_FETCHING_ORDERS });
    createSocket(url, dispatch);
}

const onData = (data: any, dispatch: any) => {
    data.orders.forEach((order: any) => {
        dispatch({ type: NEW_ORDER_CAME, order: {
            id: order.number,
            fullname: order.name,
            status: order.status,
            createdAt: order.createdAt,
            ingredientIds: order.ingredients,
            price: 0
        }});
    });
    dispatch({ type: UPDATE_TOTALS, total: data.total, todayTotal: data.totalToday});
}

const createSocket = function(url: string, dispatch: AppDispatch){
    let socket = new WebSocket(`${url}`);
    
    socket.onopen = event => {};
    socket.onerror = event => {};
    socket.onclose = event => {
        dispatch({type: CLEAR_ORDERS});
    };

    socket.onmessage = event => {
        const { data } = event;
        const parsedData = JSON.parse(data);
        const { success, ...restData } = parsedData;
        if (success){
            onData(restData, dispatch);
        }
    }
}

export const fetchAllOrders = () => async (dispatch: AppDispatch)  => {
    try {
        dispatch({type: CLEAR_ORDERS});
        await startFetching(dispatch, FETCH_ALL_ORDERS_URL);
    } catch(ex){
    }
}

export const fetchOrdersByUser = () => async (dispatch: AppDispatch)  => {
    try {
        dispatch({type: CLEAR_ORDERS});
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