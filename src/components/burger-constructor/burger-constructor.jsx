import React from 'react'

import { TotalBar } from './total-bar';
import { IngredientList } from './ingredient-list';

export class BurgerConstructor extends React.Component {
    calcTotalPrice = () => {
        return this.props.model.reduce((acc, current) => acc + current.price, 0);
    }

    render = () => (
            <section style={{marginTop: "100px", marginLeft: "40px"}}>
                <IngredientList ingredients={this.props.model}/>
                <TotalBar totalPrice={this.calcTotalPrice()}/>
            </section>
    )
}