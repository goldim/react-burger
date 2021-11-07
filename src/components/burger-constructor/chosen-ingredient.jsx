import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';
import { REMOVE_INGREDIENT } from '../../services/actions/burger-constructor'

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

const ChosenIngredient = ({id, name, type, price, image, isLocked}) => {
    const dispatch = useDispatch();

    const onRemoveItem = () =>{
        dispatch({index: id, type: REMOVE_INGREDIENT});
    }

    return (
        <div className={styles.chosenItem}>
            { isCenter(type) && <DragIcon/> }
            <ConstructorElement
                type={type}
                isLocked={isLocked}
                text={makeAlignmentLabel(name, type)}
                price={price}
                thumbnail={image}
                handleClose={onRemoveItem}
            />
        </div>
    )
}

ChosenIngredient.propTypes = {
    id: PropTypes.number.isRequired,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}

export default ChosenIngredient;