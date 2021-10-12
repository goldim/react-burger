import React from 'react'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'

export class ChosenIngredient extends React.Component {
    render = () => (
        <div className={styles.chosenItem}>
            <ConstructorElement
                type={this.props.type}
                isLocked={this.props.isLocked}
                text={this.props.name}
                price={this.props.price}
                thumbnail={this.props.image}
            />
        </div>
    )
}