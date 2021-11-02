import PropTypes from 'prop-types'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ADD_BUN, ADD_INGREDIENT } from '../../services/actions/burger-constructor'

import { CurrencyIcon, Counter } from '../../utils/yandex-components'
import styles from './burger-ingredients.module.css'

const BurgerIngredientItem = ({id, name, image, price, isBun = false}) => {
    const [counter, setCounter] = useState(0);
    
    const dispatch = useDispatch();

    const addItem = () => {
        console.log(name, id, isBun);
        if (isBun){
            dispatch({id, type: ADD_BUN});
        } else {
            dispatch({id, type: ADD_INGREDIENT});
        }
        
        setCounter(counter + 1);
    };

    return (
        <div className={styles.menuItem} onClick={e => addItem()}>
            { (counter) ? <Counter count={counter} className={styles.menuItemCounter}/> : ""}
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