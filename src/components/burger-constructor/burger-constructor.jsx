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
        return <span className="text text_type_digits-medium">3000</span>;
    }

    render = () => 
        <>
            <div>
                <div style={{height: '700px', overflowY: 'auto'}}>
                {
                    this.state.ingredients.map((ingr, i) => 
                        <ChosenIngredient key={i} {...ingr}/>
                    )
                }
                </div>
                <p>
                    { this.getTotal() } <CurrencyIcon/> <Button size="large">Оформить заказ</Button>
                </p>
            </div>
        </>
}