import { LOAD_INGREDIENTS, LOAD_INGREDIENTS_FAILED, LOAD_INGREDIENTS_SUCCESS } from './actions/burger-ingredients';
import { MAKE_ORDER, MAKE_ORDER_FAILED, MAKE_ORDER_SUCCESS } from './actions/burger-constructor';
import { RESET_PASSWORD } from './actions/auth';

const INGREDIENTS_SOURCE = 'https://norma.nomoreparties.space/api/ingredients';
const MAKING_ORDER_URL = "https://norma.nomoreparties.space/api/orders";

const fetchIngredients = async (url, dispatch) => {
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

export const getIngredients = () => async (dispatch) => {
    try {
        await fetchIngredients(INGREDIENTS_SOURCE, dispatch)
    }
    catch (e){
        console.log(e);
        dispatch({ type: LOAD_INGREDIENTS_FAILED });
    }
}

const sentData = async (url, items, dispatch) => {
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
            console.log(data.message);
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

export const makeOrder = (ingredients) => async (dispatch)  => {
    try {
        await sentData(MAKING_ORDER_URL, ingredients, dispatch);
    } catch(ex){
        console.log(ex.message);
        dispatch({
            type: MAKE_ORDER_FAILED,
            message: ex.message
        });
    }
}

const LOGIN_URL = 'https://norma.nomoreparties.space/api/auth/login';
const LOGOUT_URL = 'https://norma.nomoreparties.space/api/auth/logout';
const REGISTER_URL = 'https://norma.nomoreparties.space/api/auth/register';
const TOKEN_URL = 'https://norma.nomoreparties.space/api/auth/token';
const RESET_PASSWORD_URL = 'https://norma.nomoreparties.space/api/password-reset';

const sentEmail = async (url, email, dispatch) => {
    const data = { email };

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
            console.log(data.message);
            dispatch({ type: RESET_PASSWORD });
        } else {
            console.log(data.message);
        }
    } else {
        dispatch({
            type: MAKE_ORDER_FAILED,
            message: response.status.toString()
        });
    }
}

export const resetPassword = (email) => async (dispatch)  => {
    try {
        await sentEmail(RESET_PASSWORD_URL, email, dispatch);
    } catch(ex){
        console.log(ex.message);
    }
}