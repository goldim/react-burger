import PropTypes from 'prop-types'
import DataItemPropTypes from '../../utils/data-item-format'

import TotalBar from './total-bar'
import { IngredientList } from './ingredient-list'
import constructorStyles from './burger-constructor.module.css'

const calcTotalPrice = (ingredients) => ingredients.reduce((acc, current) => acc + current.price, 0);

const BurgerConstructor = ({data}) => (
    <section className={constructorStyles.burgerConstructor}>
        <IngredientList ingredients={data}/>
        <TotalBar totalPrice={calcTotalPrice(data)}/>
    </section>
)

BurgerConstructor.defaultProps = {
    data: []
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(DataItemPropTypes.isRequired).isRequired
}

export default BurgerConstructor;