import React from 'react'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'

export class TotalBar extends React.Component {
    render = () => (
        <p className={styles.totalBar}>
            <span className="text text_type_digits-medium">
                { this.props.totalPrice }
            </span>
            <CurrencyIcon/>
            <Button className={styles.makeOrderBtn} size="large">Оформить заказ</Button>
        </p>
    )
}