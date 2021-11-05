import { LOAD_INGREDIENTS } from './actions/burger-ingredients';
import { ORDER_MADE } from './actions/burger-constructor';

const INGREDIENTS_SOURCE = 'https://norma.nomoreparties.space/api/ingredients';
const MAKING_ORDER_URL = "https://norma.nomoreparties.space/api/orders";

const fetchIngredients = async (url, dispatch) => {
    const response = await fetch(url);

    if (response.ok) {
        const json = await response.json();
        dispatch({
            type: LOAD_INGREDIENTS,
            ingredients: json.data
        });
    } else {
        throw new Error(response.status.toString());
    }
}

export const getIngredients = () => async (dispatch) => {
    try {
        await fetchIngredients(INGREDIENTS_SOURCE, dispatch)
    }
    catch (e){
        console.log(e);
    }
}

const sentData = async (url, items, dispatch) => {
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
                type: ORDER_MADE,
                No: data.order.number,
                success: data.success
            });
        } else {
            console.log(data.message);
        }
    } else {
        throw new Error(response.status.toString());
    }
}

export const makeOrder = (ingredients) => async (dispatch)  => {
    try {
        await sentData(MAKING_ORDER_URL, ingredients, dispatch);
    } catch(ex){
        console.log(ex.message);
    }
}
