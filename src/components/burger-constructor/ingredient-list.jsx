import PropTypes from 'prop-types'
import DataItemPropTypes from '../../utils/data-item-format'

import constructorStyles from './burger-constructor.module.css'
import ChosenIngredient from './chosen-ingredient'

import { useDrag, useDrop } from 'react-dnd'
import { ADD_BUN, ADD_INGREDIENT, MOVE_INGREDIENT } from '../../services/actions/burger-constructor'
import { useDispatch } from 'react-redux'
import { useRef } from 'react'

const IngredientList = ({ingredients}) => {
    const renderTopItemLocked = (id, data) => {
        return renderLockedItem(id, data, 'top');
    }

    const renderBottomItemLocked = (id, data) => {
        return renderLockedItem(id, data, 'bottom');
    }

    const renderLockedItem = (id, data, type) => (
        <Bun id={id} data={data} type={type}/>
    )

    const renderItem = (id, data) => {
        return (<DraggableIngredient key={id} id={id} data={data}/>)
    };

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
        }
    });

    return (
        <ul className={constructorStyles.ingredientList} ref={dropTarget}>
            { isNotEmpty() ? renderTopItemLocked(0, {...ingredients[0]}) : ""}
            { isNotEmpty() ? renderScrollablePart() : "" }
            { isNotEmpty() ? renderBottomItemLocked(ingredients.length - 1, {...ingredients[0]}) : "" }
        </ul>
    )
}

const Bun = ({id, data, type}) => (
    <li key={id}>
        <ChosenIngredient id={id} {...data} type={type} isLocked={true}/>
    </li>
);

const DraggableIngredient = ({id, data}) => {
    const ref = useRef(null);
    const dispatch = useDispatch();

    const [, drag] = useDrag({
        type: "ingredientInBurger",
        item: {id}
    });

    const [, drop] = useDrop({
        accept: "ingredientInBurger",
        drop(item) {
            dispatch({type: MOVE_INGREDIENT, whatIndex: item.id, whereIndex: id});
        }
    });

    drag(drop(ref));

    return (
        <li key={id} ref={ref}>
            <ChosenIngredient id={id} {...data}/>
        </li>
    );
}

IngredientList.propTypes = {
    ingredients: PropTypes.arrayOf(DataItemPropTypes.isRequired).isRequired
}

export default IngredientList;