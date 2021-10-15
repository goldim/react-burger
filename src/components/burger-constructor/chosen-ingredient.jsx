import PropTypes from 'prop-types'

import { ConstructorElement, DragIcon } from '../../utils/yandex-components'
import styles from './burger-constructor.module.css'

const makeAlignmentLabel = (baseLabel, type) => {
    let result = "";
    if (type === "bottom") {
        result = "(низ)";
    } else if (type === "top") {
        result = "(верх)"
    }
    return (<>{baseLabel}<br/>{result}</>);
}

const isCenter = (type) => {
    return !["bottom", "top"].includes(type);
}

const ChosenIngredient = (props) => (
    <div className={styles.chosenItem}>
        { isCenter(props.type) && <DragIcon/> }
        <ConstructorElement
            type={props.type}
            isLocked={props.isLocked}
            text={makeAlignmentLabel(props.name, props.type)}
            price={props.price}
            thumbnail={props.image}
        />
    </div>
)

ChosenIngredient.propTypes = {
    type: PropTypes.string,
    isLocked: PropTypes.bool,
    name: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string
}

export default ChosenIngredient;