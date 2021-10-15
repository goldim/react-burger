import React from 'react'

import { Category } from './category';
import { CategoryBar } from './category-bar';
import ingredientsStyles from './burger-ingredients.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details.jsx/ingredient-details';

export class BurgerIngredients extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showDetails: false,
            chosenItem: {
            }
        }
    }

    getIngredientsByType = (type) => {
        return this.props.model.filter(ingr => ingr.type === type)
    }

    renderCategoriesBlock = () => (
        <div className={ingredientsStyles.categoryBlock}>
            {this.renderCategories()}
        </div>
    )

    renderCategories = () => {
        const result = [];
        this.getCategoryDescriptions().forEach(desc => {
            result.push(this.renderCategory(desc.code, desc.title));
        });
        return result;
    }

    onCloseItem = () => {
        this.setState({
            ...this.state,
            showDetails: false
        });
    }

    onItemClick = (props) => {
        this.setState({
            ...this.state,
            showDetails: true,
            chosenItem: {
                ...props
            }
        });
    }

    renderCategory = (code, title) => (
        <Category key={code} title={title} onItemClick={this.onItemClick}>
            {this.getIngredientsByType(code)}
        </Category>
    )

    getCategoryDescriptions = () => {
        return [
            {
                code: "bun",
                title: "Булки"
            },
            {
                code: "sauce",
                title: "Соусы"
            },
            {
                code: "main",
                title: "Начинки"
            }
        ];
    }

    getCategoryTitles = () => {
        return this.getCategoryDescriptions().map(cat => cat.title);
    }

    getCategoryCodes = () => {
        return this.getCategoryDescriptions().map(cat => cat.code);
    }

    moveTo = (a) => {
        document.getElementById(a).scrollIntoView();
    }

    renderCombineBurgerTitle = () => (
        <p className={`${ingredientsStyles.title} text text_type_main-large`}>
            Соберите бургер
        </p>
    )

    render = () => (
        <section className={ingredientsStyles.ingredientsMenu}>
            { this.renderCombineBurgerTitle() }
            <div className={ingredientsStyles.menuContent}>
                <CategoryBar titles={this.getCategoryTitles()} clickTab={this.moveTo}/>
                { this.renderCategoriesBlock() }
            </div>
            <Modal caption="Детали ингредиента" show={this.state.showDetails} closeHandler={this.onCloseItem}>
                <IngredientDetails {...this.state.chosenItem}/>
            </Modal>
        </section>
    )
}