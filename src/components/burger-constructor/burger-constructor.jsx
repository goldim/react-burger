import React from 'react'
import PropTypes from 'prop-types'

import TotalBar from './total-bar';
import { IngredientList } from './ingredient-list';
import constructorStyles from './burger-constructor.module.css';

export class BurgerConstructor extends React.Component {
    calcTotalPrice = () => {
        return this.props.model.reduce((acc, current) => acc + current.price, 0);
    }

    render = () => (
        <section className={constructorStyles.burgerConstructor}>
            <IngredientList ingredients={this.props.model}/>
            <TotalBar totalPrice={this.calcTotalPrice()}/>
        </section>
    )
}

BurgerConstructor.propTypes = {
    model: PropTypes.array
}