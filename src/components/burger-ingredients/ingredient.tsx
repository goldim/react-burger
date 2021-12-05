import { FC } from 'react';
import { useDispatch } from 'react-redux'
import { CHANGE_CURRENT_INGREDIENT } from '../../services/actions/burger-ingredients'

import BurgerIngredientItem from './burger-ingredient-item'

interface IIngredientProps {
    id: string,
    name: string,
    price: number,
    image: string,
    isBun: boolean
}

const Ingredient: FC<IIngredientProps> = ({id, name, image, price, isBun = false}) => {
    const dispatch = useDispatch();

    const showIngredientsDetails = () => {
        dispatch({
            id,
            type: CHANGE_CURRENT_INGREDIENT
        });
    }

    return (
        <span onClick={showIngredientsDetails}>
            <BurgerIngredientItem
                id={id}
                image={image}
                price={price}
                name={name}
                isBun={isBun}/>
        </span>
    )
}

export default Ingredient;