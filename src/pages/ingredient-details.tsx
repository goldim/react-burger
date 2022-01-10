import { useLayoutEffect } from "react";
import { Navigate, useParams } from "react-router";
import IngredientDetails from "../components/ingredient-details"
import { changeCurrentIngredient } from "../services/actions/burger-ingredients";
import { useDispatch, useSelector } from "../services/hooks";
import { IDataItem } from "../services/types/data-item-format";

const IngredientDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { ingredients, currentIngredient } = useSelector(store => store.ingredientsReducer);

    useLayoutEffect(() => {
        if (ingredients.length && id){
            dispatch(changeCurrentIngredient(id));
        }
    }, [ingredients, dispatch, id]);

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
