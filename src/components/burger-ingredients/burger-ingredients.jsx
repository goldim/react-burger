import React from 'react'

import { Category } from './category';
import { CategoryBar } from './category-bar';
import ingredientsStyles from './burger-ingredients.module.css';

export class BurgerIngredients extends React.Component {
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

    renderCategory = (code, title) => (
        <Category key={code} title={title}>
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
        </section>
    )
}