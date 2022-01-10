import { loadIngredients, loadIngredientsFailed, loadIngredientsSuccess } from '../actions/burger-ingredients';
import { HTTPS_BASE_URL } from '../constants';
import { AppDispatch } from '../types';

const INGREDIENTS_SOURCE = `${HTTPS_BASE_URL}/api/ingredients`;

const fetchIngredients = async (url: string, dispatch: AppDispatch) => {
    dispatch(loadIngredients());
    const response = await fetch(url);

    if (response.ok) {
        const json = await response.json();
        dispatch(loadIngredientsSuccess(json.data));
    } else {
        dispatch(loadIngredientsFailed());
    }
}

export const getIngredients = () => async (dispatch: AppDispatch) => {
    try {
        await fetchIngredients(INGREDIENTS_SOURCE, dispatch)
    }
    catch (e){
        dispatch(loadIngredientsFailed());
    }
}