import React from 'react'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

export class BurgerIngredientItem extends React.Component {
    render = () =>
        <div style={{display: "inline-block", textAlign: "center", paddingRight: "24px", paddingBottom: "32px",  position:"relative"}}>
            { Math.round(Math.random()) ? <Counter count={1} style={{position: "absolute", top: "0px", right: "0px"}}/> : ""}
            <img src={this.props.image} alt="no img"/>
            <p className="text text_type_digits-default">{this.props.price} <CurrencyIcon/></p>
            <p>{this.props.name}</p>
        </div>
}