import { BurgerIngredientItem } from './burger-ingredient-item'

const Ingredient = (props) => (
    <span onClick={() => props.onClick(props)}>
    <BurgerIngredientItem
        image={props.image}
        price={props.price}
        name={props.name}/>
    </span>
)

export default Ingredient;