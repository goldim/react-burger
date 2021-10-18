import PropTypes from 'prop-types'

import { CurrencyIcon, Counter } from '../../utils/yandex-components'
import styles from './burger-ingredients.module.css'

const BurgerIngredientItem = ({name, image, price}) => (
    <div className={styles.menuItem}>
        { Math.round(Math.random()) ? <Counter count={1} className={styles.menuItemCounter}/> : ""}
        <img src={image} alt="no img"/>
        <p className="text text_type_digits-default">
            {price} <CurrencyIcon/>
        </p>
        <p>{name}</p>
    </div>
)

BurgerIngredientItem.defaultProps = {
    price: 0
}

BurgerIngredientItem.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
}

export default BurgerIngredientItem;