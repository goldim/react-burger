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

    renderTopItemLocked = (data) => {
        return this.renderLockedItem(data, 'top');
    }

    renderBottomItemLocked = (data) => {
        return this.renderLockedItem(data, 'bottom');
    }

    renderLockedItem = (data, type) => (
        this.renderItem(data, type, true)
    )

    renderItem = (data, type, locked = false) => (
        <li key={data._id}>
            <ChosenIngredient {...data} type={type} isLocked={locked}/>
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
            { this.isNotEmpty() ? this.renderTopItemLocked(this.props.ingredients[0]) : ""}
            { this.renderScrollablePart() }
            { this.isNotEmpty() ? this.renderBottomItemLocked(this.props.ingredients[0]) : "" }
        </ul>
    )
}