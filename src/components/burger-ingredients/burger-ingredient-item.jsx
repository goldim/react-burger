import PropTypes from 'prop-types'
import { useSelector } from 'react-redux';

import { CurrencyIcon, Counter } from '../../utils/yandex-components'
import styles from './burger-ingredients.module.css'

import { useDrag } from 'react-dnd'

const BurgerIngredientItem = ({id, name, image, price, isBun = false}) => {
    const ids = useSelector(store => store.burgerConstruct.chosenIngredients);
    const count = ids.filter(chosenId => chosenId === id).length;

    const [, dragRef] = useDrag({
        type: "ingredient",
        item: {id, isBun}
    });

    return (
        <div className={styles.menuItem}>
            { count ? <Counter count={count} className={styles.menuItemCounter}/> : ""}
            <div ref={dragRef}>
                <img src={image} alt="no img"/>
                <p className="text text_type_digits-default">
                    {price} <CurrencyIcon/>
                </p>
                <p>{name}</p>
            </div>
        </div>
    )
}

BurgerIngredientItem.defaultProps = {
    price: 0
}

BurgerIngredientItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
}

export default BurgerIngredientItem;