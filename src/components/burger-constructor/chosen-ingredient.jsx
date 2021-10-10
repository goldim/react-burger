import React from 'react'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import ingredientImage from '../../images/ingredient.png'

export class ChosenIngredient extends React.Component {
    render = () => 
        <div style={{display: 'block', float: 'left', clear: 'both'}}><ConstructorElement
            isLocked={this.props.isLocked}
            text={this.props.name}
            price={this.props.price}
            thumbnail={ingredientImage}
        /></div>
}