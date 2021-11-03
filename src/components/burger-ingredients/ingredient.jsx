import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { CHANGE_CURRENT_INGREDIENT } from '../../services/actions/burger-ingredients'

import BurgerIngredientItem from './burger-ingredient-item'

const Ingredient = ({id, name, image, price, isBun = false}) => {
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

Ingredient.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
}

export default Ingredient;