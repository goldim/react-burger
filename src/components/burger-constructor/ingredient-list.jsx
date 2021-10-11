import React from 'react'
import { ChosenIngredient } from './chosen-ingredient'

export class IngredientList extends React.Component {
    renderTopItem = (data) => {
        return this.renderItem(data, 'top');
    }

    renderBottomItem = (data) => {
        return this.renderItem(data, 'bottom');
    }

    renderItem = (data, type) =>
        <li style={{listStyleType: 'none'}}>
            <ChosenIngredient key={data._id} {...data} type={type}/>
        </li>

    getListLength = () => {
        return this.props.ingredients.length;
    }

    isNotEmpty = () => {
        return this.props.ingredients.length !== 0;
    }

    renderScrollablePart = () => 
        <div style={{ height: '400px', overflowY: 'auto' }}>
            { this.props.ingredients.slice(1, this.getListLength() - 2).map(ingr => this.renderItem(ingr)) }
        </div>

    render = () => 
        <ul style={{ height: '600px' }}>
            { this.isNotEmpty() ? this.renderTopItem(this.props.ingredients[0]) : ""}
            { this.renderScrollablePart() }
            { this.isNotEmpty() ? this.renderBottomItem(this.props.ingredients.pop()) : "" }
        </ul>
}