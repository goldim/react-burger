import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";
import IngredientDetails from "../components/ingredient-details"
import { CHANGE_CURRENT_INGREDIENT } from "../services/actions/burger-ingredients";
import { getIngredients } from "../services/middleware.js";
import { IDataItem } from "../utils/data-item-format";

const IngredientDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { ingredients, currentIngredient } = useSelector((store: any) => store.ingredientsReducer);

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

    const hasId = (id: string) => {
        return ingredients.some((ingredient: IDataItem) => ingredient._id === id);
    }

    return (
        <>
        { ingredients.length && !hasId(id!) ? <Navigate to="/page404"/> : "" }
        { currentIngredient._id && ingredients.length ? <IngredientDetails/> : <p>{"Загрузка..."}</p> }
        </>
    );
}

export default IngredientDetailsPage;
