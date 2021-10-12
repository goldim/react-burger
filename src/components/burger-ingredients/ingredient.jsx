import React from 'react'
import { BurgerIngredientItem } from './burger-ingredient-item'

export class Ingredient extends React.Component {
    render = () => (
        <BurgerIngredientItem
            image={this.props.image}
            price={this.props.price}
            name={this.props.name}/>
    )
}