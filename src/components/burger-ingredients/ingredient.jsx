import PropTypes from 'prop-types'

import BurgerIngredientItem from './burger-ingredient-item'

const Ingredient = ({name, image, price, onClick}) => (
    <span onClick={() => onClick({name, image, price})}>
        <BurgerIngredientItem
            image={image}
            price={price}
            name={name}/>
    </span>
)

Ingredient.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Ingredient;