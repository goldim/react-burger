import React from 'react'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css'

export class BurgerIngredientItem extends React.Component {
    render = () => (
        <div className={styles.menuItem}>
            { Math.round(Math.random()) ? <Counter count={1} className={styles.menuItemCounter}/> : ""}
            <img src={this.props.image} alt="no img"/>
            <p className="text text_type_digits-default">
                {this.props.price} <CurrencyIcon/>
            </p>
            <p>{this.props.name}</p>
        </div>
    )
}