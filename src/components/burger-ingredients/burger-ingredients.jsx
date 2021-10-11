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
        const result = [];
        const modelElements = this.getIngredientsByType(category);

        for (let i = 0; i < modelElements.length; i += 2){
            const ingr = modelElements[i];
            const nextIngr = modelElements[i + 1];

            const element = <li key={i} style={{listStyleType: 'none'}}>
                { this.renderItem(ingr) }
                { nextIngr ? this.renderItem(nextIngr) : <p></p>}
            </li>
            result.push(element);

        }
        return result;
    }

    renderItem = (ingr) => {
        return <BurgerIngredientItem
            key={ingr._id}
            image={ingr.image}
            price={ingr.price}
            name={ingr.name}/>
    }

    renderCategory = (code, title) => {
        return <div  style={{marginTop: '40px', marginBottom: '40px'}}>
            <p id={title} className="text text_type_main-medium" style={{textAlign:'left'}}>{title}</p>
            <ul style={{textAlign:'left', margin:0, padding: 0}}>
                { this.renderItems(code) }
            </ul>
        </div>
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

    moveTo = (a) => {
        document.getElementById(a).scrollIntoView();
    }

    render = () => 
        <div style={{ marginTop: '40px' }}>
            <p style={{ textAlign: 'left' }} className="text text text_type_main-large">Соберите бургер</p>
            <div style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex' }}>
                    { this.getCategoryTitles().map((title, i) => <Tab key={i} onClick={() => this.moveTo(title)}>{title}</Tab>)}
                </div>
                <div  style={{overflowY: 'auto', maxHeight: '700px', height: '100%'}}>
                    <div>
                    {this.renderCategories()}
                    </div>
                </div>
            </div>
        </div>
}