import PropTypes from 'prop-types'
import DataItemPropTypes from '../../utils/data-item-format'

import constructorStyles from './burger-constructor.module.css'
import ChosenIngredient from './chosen-ingredient'

const IngredientList = ({ingredients}) => {
    const renderTopItemLocked = (id, data) => {
        return renderLockedItem(id, data, 'top');
    }

    const renderBottomItemLocked = (id, data) => {
        return renderLockedItem(id, data, 'bottom');
    }

    const renderLockedItem = (id, data, type) => (
        renderItem(id, data, type, true)
    )

    const renderItem = (id, data, type, locked = false) => (
        <li key={id}>
            <ChosenIngredient id={data._id} {...data} type={type} isLocked={locked}/>
        </li>
    )

    const getListLength = () => {
        return ingredients.length;
    }

    const isNotEmpty = () => {
        return ingredients.length !== 0;
    }

    const renderScrollablePart = () => (
        <div className={constructorStyles.dynamicPart}>
            { ingredients.slice(1, getListLength() - 1).map((ingr, index) => renderItem(index, ingr)) }
        </div>
    )

    return (
        <ul className={constructorStyles.ingredientList}>
            { isNotEmpty() ? renderTopItemLocked(0, {...ingredients[0]}) : ""}
            { renderScrollablePart() }
            { isNotEmpty() ? renderBottomItemLocked(ingredients.length, {...ingredients[0]}) : "" }
        </ul>
    )
}

IngredientList.propTypes = {
    ingredients: PropTypes.arrayOf(DataItemPropTypes.isRequired).isRequired
}

export default IngredientList;