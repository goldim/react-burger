import PropTypes from 'prop-types'

import BurgerIngredientItem from './burger-ingredient-item'

const Ingredient = (props) => (
    <span onClick={() => props.onClick(props)}>
    <BurgerIngredientItem
        image={props.image}
        price={props.price}
        name={props.name}/>
    </span>
)

Ingredient.propTypes = {
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string
}


export default Ingredient;