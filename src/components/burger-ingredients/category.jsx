import React from 'react'
import PropTypes from 'prop-types'

import Ingredient from './ingredient'
import ingredientsStyles from './burger-ingredients.module.css';
import DataItemPropTypes from '../../utils/data-item-format';

export class Category extends React.Component {
    renderItems = () => {
        const result = [];
        const items = this.props.data;

        for (let i = 0; i < items.length; i += 2){
            const ingr = items[i];
            const nextIngr = items[i + 1];
            const element = this.renderRow(ingr, nextIngr, i);
            result.push(element);

        }
        return result;
    }

    renderRow = (firstItem, secondItem, i) => (
        <li key={i} className={ingredientsStyles.noPointList}>
            { this.renderItem(firstItem) }
            { secondItem ? this.renderItem(secondItem) : <p></p>}
        </li>
    )

    renderItem = (item) => (
        <Ingredient
            key={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
            extraDetails = {{
                fat: item.fat,
                calories: item.calories,
                carbohydrates: item.carbohydrates,
                proteins: item.proteins
            }}
            onClick={this.props.onItemClick}
            />
    )

    render = () => (
        <div className={ingredientsStyles.category}>
            <p id={this.props.title} className={`${ingredientsStyles.title} text text_type_main-medium`}>
                {this.props.title}
            </p>
            <ul className={ingredientsStyles.categoryList}>
                { this.renderItems() }
            </ul>
        </div>
    )
}

Category.propTypes = {
    title: PropTypes.string.isRequired,
    onItemClick: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(DataItemPropTypes.isRequired).isRequired
}