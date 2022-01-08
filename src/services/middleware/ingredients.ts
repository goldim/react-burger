import { HTTPS_BASE_URL } from '../constants';
import { LOAD_INGREDIENTS, LOAD_INGREDIENTS_FAILED, LOAD_INGREDIENTS_SUCCESS } from '../constants/burger-ingredients';
import { AppDispatch } from '../types';

const INGREDIENTS_SOURCE = `${HTTPS_BASE_URL}/api/ingredients`;

const fetchIngredients = async (url: string, dispatch: AppDispatch) => {
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

export const getIngredients = () => async (dispatch: AppDispatch) => {
    try {
        await fetchIngredients(INGREDIENTS_SOURCE, dispatch)
    }
    catch (e){
        dispatch({ type: LOAD_INGREDIENTS_FAILED });
    }
}