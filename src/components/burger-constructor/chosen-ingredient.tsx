import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { REMOVE_INGREDIENT } from '../../services/actions/burger-constructor'

import { ConstructorElement, DragIcon } from '../../utils/yandex-components'
import styles from './burger-constructor.module.css'

type TIngredientType = "bottom" | "top" | undefined;

const makeAlignmentLabel = (baseLabel: string, type: TIngredientType): string => {
    let result = "";
    if (type === "bottom") {
        result = "(низ)";
    } else if (type === "top") {
        result = "(верх)"
    }
    return `${baseLabel}\n${result}`;
}

const isCenter = (type: TIngredientType): boolean => {
    return !["bottom", "top"].includes(type === undefined ? "": type);
}

const DragIconContainer = () => (
    <div className={styles.dragIcon}>
        <DragIcon type="primary"/>
    </div>
)

interface IChosenIngredientProps {
    id: number,
    name: string,
    type: TIngredientType,
    price: number,
    image: string,
    isLocked: boolean
}

const ChosenIngredient: FC<IChosenIngredientProps> = ({id, name, type, price, image, isLocked}) => {
    const dispatch = useDispatch();

    const onRemoveItem = () =>{
        dispatch({index: id, type: REMOVE_INGREDIENT});
    }

    return (
        <div className={styles.chosenItem}>
            { isCenter(type) &&  <DragIconContainer/>}
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

export default ChosenIngredient;