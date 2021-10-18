import React from 'react'
import PropTypes from 'prop-types'

import constructorStyles from './burger-constructor.module.css'
import ChosenIngredient from './chosen-ingredient'
import DataItemPropTypes from '../../utils/data-item-format'

export class IngredientList extends React.Component {
    renderTopItem = (data) => {
        return this.renderItem(data, 'top');
    }

    renderBottomItem = (data) => {
        return this.renderItem(data, 'bottom');
    }

    renderTopItemLocked = (id, data) => {
        return this.renderLockedItem(id, data, 'top');
    }

    renderBottomItemLocked = (id, data) => {
        return this.renderLockedItem(id, data, 'bottom');
    }

    renderLockedItem = (id, data, type) => (
        this.renderItem(id, data, type, true)
    )

    renderItem = (id, data, type, locked = false) => (
        <li key={id}>
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
            { this.props.ingredients.slice(1, this.getListLength() - 2).map((ingr, index) => this.renderItem(index, ingr)) }
        </div>
    )

    render = () => (
        <ul className={constructorStyles.ingredientList}>
            { this.isNotEmpty() ? this.renderTopItemLocked(0, {...this.props.ingredients[0]}) : ""}
            { this.renderScrollablePart() }
            { this.isNotEmpty() ? this.renderBottomItemLocked(this.props.ingredients.length - 1, {...this.props.ingredients[0]}) : "" }
        </ul>
    )
}

IngredientList.propTypes = {
    ingredients: PropTypes.arrayOf(DataItemPropTypes.isRequired).isRequired
}