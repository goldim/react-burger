import React from 'react'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export class TotalBar extends React.Component {
    render = () => (
        <p style={{marginTop: "40px", textAlign: "right"}}>
            <span className="text text_type_digits-medium">
                { this.props.totalPrice }
            </span>
            <CurrencyIcon/>
            <Button size="large" style={{marginLeft: "40px"}}>Оформить заказ</Button>
        </p>
    )
}