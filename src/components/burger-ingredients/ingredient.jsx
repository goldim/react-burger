import PropTypes from 'prop-types'

import BurgerIngredientItem from './burger-ingredient-item'

const Ingredient = ({id, name, image, price, onClick, extraDetails}) => (
    <span onDoubleClick={() => onClick({name, image, price, extraDetails})}>
        <BurgerIngredientItem
            id={id}
            image={image}
            price={price}
            name={name}/>
    </span>
)

const ExtraDetails = PropTypes.shape({
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired
});

Ingredient.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    extraDetails: ExtraDetails.isRequired
}

export default Ingredient;