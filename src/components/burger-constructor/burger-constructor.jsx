import React from 'react'
import { ChosenIngredient } from './chosen-ingredient'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import ingredientModel from '../../utils/data.json'

export class BurgerConstructor extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            ingredients: []
        }
    }

    componentDidMount = () => {
        this.setState({ingredients: [...ingredientModel]});
    }

    getTotal = () => {
        const total = this.state.ingredients.reduce((acc, current) => acc + current.price, 0);
        return <span className="text text_type_digits-medium">{total}</span>;
    }

    renderIngredients = () => {
        const result = [];
        const items = this.state.ingredients;
        for (let i = 0; i < items.length; i++){
            let type;
            if (i === 0){
                type = "top";
            } else if (i === items.length - 1) {
                type = "bottom";
            }

            const ingr = items[i];
            result.push(this.renderIngredient(ingr, type));
        }
        
        return result;
    }

    renderIngredient = (ingr, type) => {
        return <li style={{listStyleType: 'none'}}><ChosenIngredient key={ingr._id} {...ingr} type={type}/></li>
    }

    componentDidUpdate(){
        console.log("updated");
    }

    render = () => 
            <div style={{marginTop: "100px", marginLeft: "40px"}}>
                <ul style={{height: '700px', overflowY: 'auto'}}>
                { this.renderIngredients() }
                </ul>
                <p style={{marginTop: "40px", textAlign: "right"}}>
                    { this.getTotal() } <CurrencyIcon/> <Button size="large" style={{marginLeft: "40px"}}>Оформить заказ</Button>
                </p>
            </div>
}