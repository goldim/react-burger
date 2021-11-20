import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";
import IngredientDetails from "../components/ingredient-details.jsx"
import PageWithAppHeader from "../components/page-with-app-header/index.jsx";
import { CHANGE_CURRENT_INGREDIENT } from "../services/actions/burger-ingredients.js";
import { getIngredients } from "../services/middleware.js";

const IngredientDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { ingredients, currentIngredient } = useSelector(store => store.ingredientsReducer);

    useLayoutEffect(() => {
        if (ingredients.length){
            dispatch({
                id,
                type: CHANGE_CURRENT_INGREDIENT
            });
        }
    }, [ingredients, dispatch, id]);

    useLayoutEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    useLayoutEffect(() => {
    }, [currentIngredient, dispatch]);

    const hasId = (id) => {
        return ingredients.some(ingredient => ingredient._id === id);
    }

    return (
        <PageWithAppHeader>
            { ingredients.length && !hasId(id) ? <Navigate to="/page404"/> : "" }
            { currentIngredient._id && ingredients.length ? <IngredientDetails/> : <p>{"Загрузка..."}</p> }
        </PageWithAppHeader>
    );
}

export default IngredientDetailsPage;
