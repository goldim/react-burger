import { LOAD_INGREDIENTS } from '../actions/load-ingredients'
import data from '../../utils/data.json'

const fetchIngredients = async (url) => {
    const response = await fetch(url);

    if (response.ok) {
        const json = await response.json();
        return json.data;
    } else {
        throw new Error(response.status.toString());
    }
}

const INGREDIENTS_SOURCE = 'https://norma.nomoreparties.space/api/ingredients';

export const loadIngredients = async () => {
    try {
        const data = await fetchIngredients(INGREDIENTS_SOURCE)
        return data;
    }
    catch (e){
        console.log(e);
    }
}

export const loadFake = () => {
    return data;
}

export const LoadIngredientsReducer = (state = {ingredients: []}, action) => {
    switch (action.type){
        case LOAD_INGREDIENTS:
            return {
                ...state,
                ingredients: loadFake()
            };
        default:
            return state;
    }
}