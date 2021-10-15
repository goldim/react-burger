import PropTypes from 'prop-types'

import { CurrencyIcon, Counter } from '../../utils/yandex-components'
import styles from './burger-ingredients.module.css'

const BurgerIngredientItem = (props) => (
    <div className={styles.menuItem}>
        { Math.round(Math.random()) ? <Counter count={1} className={styles.menuItemCounter}/> : ""}
        <img src={props.image} alt="no img"/>
        <p className="text text_type_digits-default">
            {props.price} <CurrencyIcon/>
        </p>
        <p>{props.name}</p>
    </div>
)

BurgerIngredientItem.propTypes = {
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string
}

export default BurgerIngredientItem;