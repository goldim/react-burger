import React from 'react'
import { BurgerIngredientItem } from './burger-ingredient-item'

export class Ingredient extends React.Component {
    render = () => (
        <BurgerIngredientItem
            key={this.props._id}
            image={this.props.image}
            price={this.props.price}
            name={this.props.name}/>
    )
}