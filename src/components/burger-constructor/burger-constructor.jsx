import React from 'react'

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
        this.setState({ingredients: [...this.props.model]});
    }

    calcTotalPrice = () => {
        return this.state.ingredients.reduce((acc, current) => acc + current.price, 0);
    }

    render = () => 
            <section style={{marginTop: "100px", marginLeft: "40px"}}>
                <IngredientList ingredients={this.state.ingredients}/>
                <TotalBar totalPrice={this.calcTotalPrice()}/>
            </section>
}