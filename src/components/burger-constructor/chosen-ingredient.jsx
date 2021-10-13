import React from 'react'
import { ConstructorElement, DragIcon } from '../../utils/yandex-components'
import styles from './burger-constructor.module.css'

export class ChosenIngredient extends React.Component {
    makeAlignmentLabel = (baseLabel, type) => {
        let result = "";
        if (type === "bottom") {
            result = "(низ)";
        } else if (type === "top") {
            result = "(верх)"
        }
        return (<>{baseLabel}<br/>{result}</>);
    }

    isCenter = (type) => {
        return !["bottom", "top"].includes(type);
    }

    render = () => (
        <div className={styles.chosenItem}>
            { this.isCenter(this.props.type) && <DragIcon/> }
            <ConstructorElement
                type={this.props.type}
                isLocked={this.props.isLocked}
                text={this.makeAlignmentLabel(this.props.name, this.props.type)}
                price={this.props.price}
                thumbnail={this.props.image}
            />
        </div>
    )
}