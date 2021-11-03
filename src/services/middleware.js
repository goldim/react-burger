import { LOAD_INGREDIENTS } from './actions/burger-ingredients';

const INGREDIENTS_SOURCE = 'https://norma.nomoreparties.space/api/ingredients';

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

export const getIngredients = () => (dispatch) => {
    try {
        fetchIngredients(INGREDIENTS_SOURCE, dispatch)
    }
    catch (e){
        console.log(e);
    }
}
