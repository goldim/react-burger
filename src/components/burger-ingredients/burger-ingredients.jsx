import React from 'react'

import { Category } from './category';
import { CategoryBar } from './category-bar';

export class BurgerIngredients extends React.Component {
    getIngredientsByType = (type) => {
        return this.props.model.filter(ingr => ingr.type === type)
    }


    renderCategoriesBlock = () => (
        <div  style={{overflowY: 'auto', maxHeight: '700px', height: '100%'}}>
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
        <p style={{ textAlign: 'left' }} className="text text text_type_main-large">
            Соберите бургер
        </p>
    )

    render = () => (
        <section style={{ marginTop: '40px' }}>
            { this.renderCombineBurgerTitle() }
            <div style={{ marginTop: '20px' }}>
                <CategoryBar titles={this.getCategoryTitles()} clickTab={this.moveTo}/>
                { this.renderCategoriesBlock() }
            </div>
        </section>
    )
}