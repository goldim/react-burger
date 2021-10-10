import React from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export class BurgerIngredientItem extends React.Component {
    render = () => 
        <div>
            <img src={this.props.image} alt="no img"/>
            <p>{this.props.price} <CurrencyIcon/></p>
            <p>{this.props.name}</p>
        </div>
}