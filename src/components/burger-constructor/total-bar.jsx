import React from 'react'
import PropTypes from 'prop-types'

import { Button, CurrencyIcon } from '../../utils/yandex-components'
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import styles from './burger-constructor.module.css'

const TotalBar = (props) => {
    const [modalShow, setModalShow] = React.useState(false);

    const makeOrder = () => {
        setModalShow(true);
    }

    const closeModal = () => {
        setModalShow(false);
    }

    return (
        <div className={styles.totalBar}>
            <div className={styles.priceCurrency}>
                <span className="text text_type_digits-medium">
                    { props.totalPrice }
                </span>
                <CurrencyIcon/>
            </div>
            <Button size="large" onClick={makeOrder}>
                Оформить заказ
            </Button>
            <Modal show={modalShow} closeHandler={closeModal}>
                <OrderDetails/>
            </Modal>
        </div>
    )
}

TotalBar.propTypes = {
    totalPrice: PropTypes.number
}

export default TotalBar;