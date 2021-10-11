import React from 'react'
import { ChosenIngredient } from './chosen-ingredient'

import ingredientModel from '../../utils/data.json'
import { TotalBar } from './total-bar';
import { IngredientList } from './ingredient-list';

export class BurgerConstructor extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            ingredients: []
        }
    }

    componentDidMount = () => {
        this.setState({ingredients: [...ingredientModel]});
    }

    calcTotalPrice = () => {
        return this.state.ingredients.reduce((acc, current) => acc + current.price, 0);
    }

    renderIngredient = (ingr, type) => {
        return <li style={{listStyleType: 'none'}}><ChosenIngredient key={ingr._id} {...ingr} type={type}/></li>
    }

    render = () => 
            <div style={{marginTop: "100px", marginLeft: "40px"}}>
                <IngredientList ingredients={this.state.ingredients}/>
                <TotalBar totalPrice={this.calcTotalPrice()}/>
            </div>
}