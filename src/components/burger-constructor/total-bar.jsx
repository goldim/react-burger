import { useState, useReducer, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import DataItemPropTypes from '../../utils/data-item-format'

import { Button, CurrencyIcon } from '../../utils/yandex-components'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import styles from './burger-constructor.module.css'

const MAKING_ORDER_URL = "https://norma.nomoreparties.space/api/orders";

const sentData = async (url, items) => {
    const data = {"ingredients": items.map(item => item._id)};

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        return await response.json();
    } else {
        throw new Error(response.status.toString());
    }
}

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
    const [modalShow, setModalShow] = useState(false);
    const [order, setOrder] = useState({
        No: 0,
        success: false
    });

    const makeOrder = async () => {
        try {
            const data = await sentData(MAKING_ORDER_URL, ingredients);
            if (data.success){
                setOrder({
                    ...order,
                    No: data.order.number,
                    success: data.success
                });
                setModalShow(true);
            } else {
                console.log(data.message);
            }
        } catch(ex){
            console.log(ex.message);
        }
    }

    const closeModal = () => {
        setModalShow(false);
    }

    const [totalPrice, dispatch] = useReducer(calcTotalPriceReducer, 0);
    
    useLayoutEffect(() => {
        dispatch({type: 'CALC_TOTAL_PRICE', ingredients});
    }, [ingredients]);

    return (
        <div className={styles.totalBar}>
            <div className={styles.priceCurrency}>
                <span className="text text_type_digits-medium">
                    {totalPrice}
                </span>
                <CurrencyIcon/>
            </div>
            <Button size="large" onClick={makeOrder}>
                Оформить заказ
            </Button>
            <Modal show={modalShow} closeHandler={closeModal}>
                <OrderDetails No={order.No} success={order.success}/>
            </Modal>
        </div>
    )
}

TotalBar.propTypes = {
    ingredients: PropTypes.arrayOf(DataItemPropTypes.isRequired).isRequired
}

export default TotalBar;