import { LOAD_INGREDIENTS, LOAD_INGREDIENTS_FAILED, LOAD_INGREDIENTS_SUCCESS } from './constants/burger-ingredients';
import { MAKE_ORDER, MAKE_ORDER_FAILED, MAKE_ORDER_SUCCESS } from './constants/burger-constructor';
import { Dispatch } from 'react';
import { TDataItems } from '../utils/data-item-format';

const INGREDIENTS_SOURCE = 'https://norma.nomoreparties.space/api/ingredients';
const MAKING_ORDER_URL = "https://norma.nomoreparties.space/api/orders";

const fetchIngredients = async (url: string, dispatch: Dispatch<any>) => {
    dispatch({ type: LOAD_INGREDIENTS });
    const response = await fetch(url);

    if (response.ok) {
        const json = await response.json();
        dispatch({
            type: LOAD_INGREDIENTS_SUCCESS,
            ingredients: json.data
        });
    } else {
        dispatch({ type: LOAD_INGREDIENTS_FAILED });
    }
}

export const getIngredients = () => async (dispatch: Dispatch<any>) => {
    try {
        await fetchIngredients(INGREDIENTS_SOURCE, dispatch)
    }
    catch (e){
        dispatch({ type: LOAD_INGREDIENTS_FAILED });
    }
}

const sentData = async (url: string, items: TDataItems, dispatch: Dispatch<any>) => {
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

export const makeOrder = (ingredients: TDataItems) => async (dispatch: Dispatch<any>)  => {
    try {
        await sentData(MAKING_ORDER_URL, ingredients, dispatch);
    } catch(ex){
        dispatch({
            type: MAKE_ORDER_FAILED,
            message: (ex as Error).message
        });
    }
}