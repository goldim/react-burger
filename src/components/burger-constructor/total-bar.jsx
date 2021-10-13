import React from 'react'
import { Button, CurrencyIcon } from '../../utils/yandex-components'
import styles from './burger-constructor.module.css'

export class TotalBar extends React.Component {
    render = () => (
        <p className={styles.totalBar}>
            <div className={styles.priceCurrency}>
                <span className="text text_type_digits-medium">
                    { this.props.totalPrice }
                </span>
                <CurrencyIcon/>
            </div>
            <Button size="large">Оформить заказ</Button>
        </p>
    )
}