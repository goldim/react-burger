import { useReducer, useLayoutEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import DataItemPropTypes from '../../utils/data-item-format'

import { Button, CurrencyIcon } from '../../utils/yandex-components'
import Modal from '../modal'
import OrderDetails from '../order-details'
import styles from './burger-constructor.module.css'
import detailsWindowStyles from '../order-details/order-details.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { makeOrder } from '../../services/middleware'
import { NEW_ORDER } from '../../services/actions/burger-constructor'
import { getProfile } from '../../services/middleware/auth'
import { useNavigate } from 'react-router'

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
    const currentOrder = useSelector(store => store.burgerConstruct.currentOrder);
    const hasBun = useSelector(store => store.burgerConstruct.hasBun);
    const reduxDispatch = useDispatch();
    const name = useSelector(store => store.authReducer.currentUser.name);
    const authed = name !== "";

    const closeModal = () => {
        reduxDispatch({type: NEW_ORDER})
    }

    const init = useCallback(() => {
        reduxDispatch(getProfile());
    }, [reduxDispatch]);

    useLayoutEffect(() => {
        init();
    }, [init]);

    const [totalPrice, dispatch] = useReducer(calcTotalPriceReducer, 0);
    
    useLayoutEffect(() => {
        dispatch({type: 'CALC_TOTAL_PRICE', ingredients});
    }, [ingredients]);

    const navigate = useNavigate();

    const onMakeOrderClick = () => {
        if (authed){
            if (hasBun){
                reduxDispatch(makeOrder(ingredients))
            }
        } else {
            navigate("/login");
        }
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
            <StatusModal/>
            <Modal show={!!currentOrder.No} closeHandler={closeModal}>
                <OrderDetails No={currentOrder.No} success={currentOrder.success}/>
            </Modal>
        </div>
    )
}

const StatusModal = () => {
    const {currentOrderIsLoading, currentOrderFailed} = useSelector(store => store.burgerConstruct);
    const reduxDispatch = useDispatch();
    const closeProgressOrFailedModal = () => {
        reduxDispatch({type: NEW_ORDER})
    }
    return (
        <Modal show={currentOrderFailed || currentOrderIsLoading} closeHandler={closeProgressOrFailedModal}>
            <div className={detailsWindowStyles.OrderDetails}>
                <p className="text text_type_main-medium">
                    {(currentOrderIsLoading) ? "Загрузка...": "Произошел сбой в выполнении заказа"}
                </p>
            </div>
        </Modal>
    );
}

TotalBar.propTypes = {
    ingredients: PropTypes.arrayOf(DataItemPropTypes.isRequired).isRequired
}

export default TotalBar;