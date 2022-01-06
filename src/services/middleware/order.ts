import { MAKE_ORDER, MAKE_ORDER_FAILED, MAKE_ORDER_SUCCESS } from '../constants/burger-constructor';
import { TDataItems } from '../types/data-item-format';
import { AppDispatch } from '../types';

const MAKING_ORDER_URL = "https://norma.nomoreparties.space/api/orders";
const FETCH_ALL_ORDERS_URL = 'wss://norma.nomoreparties.space/orders/all';
const FETCH_ORDERS_FOR_USER_URL = 'wss://norma.nomoreparties.space/orders';

const sentData = async (url: string, items: TDataItems, dispatch: AppDispatch) => {
    dispatch({ type: MAKE_ORDER });
    const data = {"ingredients": items.map(item => item._id)};

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
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