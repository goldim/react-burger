import React from 'react'
import constructorStyles from './burger-constructor.module.css'
import { ChosenIngredient } from './chosen-ingredient'

export class IngredientList extends React.Component {
    renderTopItem = (data) => {
        return this.renderItem(data, 'top');
    }

    renderBottomItem = (data) => {
        return this.renderItem(data, 'bottom');
    }

    renderItem = (data, type) => (
        <li key={data._id}>
            <ChosenIngredient {...data} type={type}/>
        </li>
    )

    getListLength = () => {
        return this.props.ingredients.length;
    }

    isNotEmpty = () => {
        return this.props.ingredients.length !== 0;
    }

    renderScrollablePart = () => (
        <div className={constructorStyles.dynamicPart}>
            { this.props.ingredients.slice(1, this.getListLength() - 2).map(ingr => this.renderItem(ingr)) }
        </div>
    )

    render = () => (
        <ul className={constructorStyles.ingredientList}>
            { this.isNotEmpty() ? this.renderTopItem(this.props.ingredients[0]) : ""}
            { this.renderScrollablePart() }
            { this.isNotEmpty() ? this.renderBottomItem(this.props.ingredients.pop()) : "" }
        </ul>
    )
}