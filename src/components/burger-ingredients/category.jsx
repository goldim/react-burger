import React from 'react'
import PropTypes from 'prop-types'

import Ingredient from './ingredient'
import ingredientsStyles from './burger-ingredients.module.css';

export class Category extends React.Component {
    renderItems = () => {
        const result = [];
        const items = this.props.children;

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

    renderItem = (ingr) => (
        <Ingredient
            key={ingr._id}
            {...ingr}
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
    title: PropTypes.string,
    onItemClick: PropTypes.func,
    children: PropTypes.arrayOf(PropTypes.object)
}