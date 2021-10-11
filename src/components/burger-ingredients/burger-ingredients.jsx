import React from 'react'

import ingredientModel from '../../utils/data.json'
import { Category } from './category';
import { CategoryBar } from './category-bar';

export class BurgerIngredients extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount = () => {
        this.setState({data: [...ingredientModel]});
    }

    getIngredientsByType = (type) => {
        return this.state.data.filter(ingr => ingr.type === type)
    }


    renderCategoriesBlock = () => 
        <div  style={{overflowY: 'auto', maxHeight: '700px', height: '100%'}}>
            {this.renderCategories()}
        </div>

    renderCategories = () => {
        const result = [];
        this.getCategoryDescriptions().forEach(desc => {
            result.push(<Category title={desc.title}>
                {this.getIngredientsByType(desc.code)}
            </Category>);
        });
        return result;
    }

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

    renderCombineBurgerTitle = () => 
        <p style={{ textAlign: 'left' }} className="text text text_type_main-large">
            Соберите бургер
        </p>

    render = () => 
        <section style={{ marginTop: '40px' }}>
            { this.renderCombineBurgerTitle() }
            <div style={{ marginTop: '20px' }}>
                <CategoryBar titles={this.getCategoryTitles()} clickTab={this.moveTo}/>
                { this.renderCategoriesBlock() }
            </div>
        </section>
}