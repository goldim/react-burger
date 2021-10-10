import React from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIngredientItem } from './burger-ingredient-item'

import ingredientModel from '../../utils/data.json'

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

    renderItems = (category) => {
        return this.getIngredientsByType(category)
            .map(ingr =>
                <BurgerIngredientItem
                    key={ingr._id}
                    image={ingr.image}
                    price={ingr.price}
                    name={ingr.name}
                />
            );
    }

    renderCategory = (code, title) => {
        return <>
            <p className="text text_type_main-large" style={{textAlign:'left'}}>{title}</p>
            <div style={{display:'flex', flexWrap: 'wrap', flexDirection: 'row'}}>
                { this.renderItems(code) }
            </div>
        </>
    }

    renderCategories = () => {
        const result = [];
        const codes = this.getCategoryCodes();
        const titles = this.getCategoryTitles();
        for (let i = 0; i < this.getCategoryCodes().length; i++){
            result.push(
                this.renderCategory(
                    codes[i],
                    titles[i]
                )
            );
        }
        return result;
    }

    getCategoryTitles = () => {
        return ["Булки", "Соусы", "Начинки"];
    }

    getCategoryCodes = () => {
        return ["bun", "sauce", "main"];
    }

    render = () => 
        <div>
            <div style={{ textAlign: 'left' }}>Соберите бургер</div>
            <div>
                <div style={{ display: 'flex' }}>
                    { this.getCategoryTitles().map((title, i) => <Tab key={i}>{title}</Tab>)}
                </div>
                <div  style={{overflowY: 'auto', maxHeight: '700px', height: '100%', width: '600px'}}>
                    <div>
                    {this.renderCategories()}
                    </div>
                </div>
            </div>
        </div>
}