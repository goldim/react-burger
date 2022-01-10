import { IDataItem, TDataItems } from '../../services/types/data-item-format'

import constructorStyles from './burger-constructor.module.css'
import ChosenIngredient, { TIngredientType } from './chosen-ingredient'

import { useDrag, useDrop } from 'react-dnd'
import { FC, useRef } from 'react'
import { IBurgerIngredientItemProps } from '../burger-ingredients/burger-ingredient-item'
import { useDispatch, useSelector } from '../../services/hooks'
import { addBun, addIngredient, moveIngredient } from '../../services/actions/burger-constructor'

interface IIngredientListProps {
    ingredients: TDataItems
}

const IngredientList: FC<IIngredientListProps> = ({ingredients}) => {
    const renderTopItemLocked = (id: number, data: IDataItem) => {
        return renderLockedItem(id, data, 'top');
    }

    const renderBottomItemLocked = (id: number, data: IDataItem) => {
        return renderLockedItem(id, data, 'bottom');
    }

    const renderLockedItem = (id: number, data: IDataItem, type: TIngredientType) => (
        <Bun id={id} data={data} type={type}/>
    )

    const renderItem = (id: number, data: IDataItem) => {
        return (<DraggableIngredient key={id} id={id} data={data}/>)
    };

    const getListLength = () => {
        return ingredients.length;
    }

    const isNotEmpty = () => {
        return ingredients.length !== 0;
    }

    const renderScrollablePart = (startIndex: number, endIndex: number) => {
        return(
            <div className={constructorStyles.dynamicPart}>
                { ingredients.slice(startIndex, endIndex).map((ingr, index) => renderItem(index, ingr)) }
            </div>
        );
    }

    const dispatch = useDispatch();
    const hasBun = useSelector(store => store.burgerConstruct.hasBun);

    const onDropHandler = (item: IBurgerIngredientItemProps) => {
        if (item.isBun){
            dispatch(addBun(item.id));
        } else {
            dispatch(addIngredient(item.id));
        }
    }

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item: IBurgerIngredientItemProps) {
            onDropHandler(item);
        }
    });

    
    let startIndex, endIndex;
    if (hasBun){
        startIndex = 1;
        endIndex = getListLength() - 1;
    } else {
        startIndex = 0;
        endIndex = getListLength();
    }

    return (
        <ul className={constructorStyles.ingredientList} ref={dropTarget}>
            { isNotEmpty() && hasBun ? renderTopItemLocked(0, {...ingredients[0]}) : ""}
            { isNotEmpty() ? renderScrollablePart(startIndex, endIndex) : "" }
            { isNotEmpty() && hasBun ? renderBottomItemLocked(ingredients.length - 1, {...ingredients[0]}) : "" }
        </ul>
    )
}

interface IBunProps {
    id: number,
    type: TIngredientType,
    data: Omit<IDataItem, "id">
}

const Bun: FC<IBunProps> = ({id, data, type}) => (
    <li key={id}>
        <ChosenIngredient id={id} {...data} type={type} isLocked={true}/>
    </li>
);

interface IDraggableIngredientProps {
    id: number,
    data: Omit<Omit<IDataItem, "id">, "type">
}

const DraggableIngredient: FC<IDraggableIngredientProps> = ({id, data}) => {
    const ref = useRef(null);
    const dispatch = useDispatch();

    const [, drag] = useDrag({
        type: "ingredientInBurger",
        item: {id}
    });

    const [, drop] = useDrop({
        accept: "ingredientInBurger",
        drop(item: IBurgerIngredientItemProps) {
            dispatch(moveIngredient(parseInt(item.id), id));
        }
    });

    drag(drop(ref));

    return (
        <li key={id} ref={ref}>
            <ChosenIngredient id={id} type={undefined} {...data} isLocked={false}/>
        </li>
    );
}

export default IngredientList;