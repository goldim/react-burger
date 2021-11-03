import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';
import { ADD_BUN, ADD_INGREDIENT } from '../../services/actions/burger-constructor'

import { CurrencyIcon, Counter } from '../../utils/yandex-components'
import styles from './burger-ingredients.module.css'

const BurgerIngredientItem = ({id, name, image, price, isBun = false}) => {
    const ids = useSelector(store => store.burgerConstruct.chosenIngredients);
    const count = ids.filter(chosenId => chosenId === id).length;
    const dispatch = useDispatch();

    const addItem = () => {
        if (isBun){
            dispatch({id, type: ADD_BUN});
        } else {
            dispatch({id, type: ADD_INGREDIENT});
        }
    };

    return (
        <div className={styles.menuItem} onClick={e => addItem()}>
            { count ? <Counter count={count} className={styles.menuItemCounter}/> : ""}
            <img src={image} alt="no img"/>
            <p className="text text_type_digits-default">
                {price} <CurrencyIcon/>
            </p>
            <p>{name}</p>
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