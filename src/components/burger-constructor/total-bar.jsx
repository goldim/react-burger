import { useReducer, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import DataItemPropTypes from '../../utils/data-item-format'

import { Button, CurrencyIcon } from '../../utils/yandex-components'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import styles from './burger-constructor.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { makeOrder } from '../../services/middleware'
import { NEW_ORDER } from '../../services/actions/burger-constructor'

const calcTotalPrice = (ingredients) => ingredients.reduce((acc, current) => acc + current.price, 0);

const calcTotalPriceReducer = (state, action) => {
    switch (action.type){
        case 'CALC_TOTAL_PRICE':
            return calcTotalPrice(action.ingredients)
        default:
            return state;
    }
}

const TotalBar = ({ingredients}) => {
    const order =  useSelector(store => store.burgerConstruct.currentOrder);
    const reduxDispatch = useDispatch();

    const closeModal = () => {
        reduxDispatch({type: NEW_ORDER})
    }

    const [totalPrice, dispatch] = useReducer(calcTotalPriceReducer, 0);
    
    useLayoutEffect(() => {
        dispatch({type: 'CALC_TOTAL_PRICE', ingredients});
    }, [ingredients]);
    const onMakeOrderClick = () => {
        reduxDispatch(makeOrder(ingredients))
    }

    return (
        <div className={styles.totalBar}>
            <div className={styles.priceCurrency}>
                <span className="text text_type_digits-medium">
                    {totalPrice}
                </span>
                <CurrencyIcon/>
            </div>
            <Button size="large" onClick={onMakeOrderClick}>
                Оформить заказ
            </Button>
            <Modal show={!!order.No} closeHandler={closeModal}>
                <OrderDetails No={order.No} success={order.success}/>
            </Modal>
        </div>
    )
}

TotalBar.propTypes = {
    ingredients: PropTypes.arrayOf(DataItemPropTypes.isRequired).isRequired
}

export default TotalBar;