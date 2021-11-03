import PropTypes from 'prop-types'
import DataItemPropTypes from '../../utils/data-item-format'

import constructorStyles from './burger-constructor.module.css'
import ChosenIngredient from './chosen-ingredient'

import { useDrop } from 'react-dnd'
import { ADD_BUN, ADD_INGREDIENT } from '../../services/actions/burger-constructor'
import { useDispatch } from 'react-redux'

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
            <ChosenIngredient id={id} {...data} type={type} isLocked={locked}/>
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

    const dispatch = useDispatch();

    const onDropHandler = (item) => {
        if (item.isBun){
            dispatch({id: item.id, type: ADD_BUN});
        } else {
            dispatch({id: item.id, type: ADD_INGREDIENT});
        }
    }

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item) {
            onDropHandler(item);
        },
    });

    return (
        <ul className={constructorStyles.ingredientList} ref={dropTarget}>
            { isNotEmpty() ? renderTopItemLocked(0, {...ingredients[0]}) : ""}
            { isNotEmpty() ? renderScrollablePart() : "" }
            { isNotEmpty() ? renderBottomItemLocked(ingredients.length - 1, {...ingredients[0]}) : "" }
        </ul>
    )
}

IngredientList.propTypes = {
    ingredients: PropTypes.arrayOf(DataItemPropTypes.isRequired).isRequired
}

export default IngredientList;