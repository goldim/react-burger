import React from 'react'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'

export class ChosenIngredient extends React.Component {
    render = () => (
        <div style={{marginBottom: "16px", width: "100%"}}>
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