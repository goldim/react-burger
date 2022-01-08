import { CurrencyIcon, Counter } from '../../utils/yandex-components'
import styles from './burger-ingredients.module.css'

import { useDrag } from 'react-dnd'
import { FC } from 'react';
import { useSelector } from '../../services/hooks';

export interface IBurgerIngredientItemProps {
    id: string,
    name: string,
    price: number,
    image: string,
    isBun: boolean
}

const BurgerIngredientItem: FC<IBurgerIngredientItemProps> = ({id, name, image, price = 0, isBun = false}) => {
    const ids = useSelector(store => store.burgerConstruct.chosenIngredients);
    const count = ids.filter((chosenId: string) => chosenId === id).length;

    const [, dragRef] = useDrag({
        type: "ingredient",
        item: {id, isBun}
    });

    return (
        <div className={styles.menuItem}>
            { count ? <span className={styles.menuItemCounter}><Counter count={count}/></span> : ""}
            <div ref={dragRef}>
                <img src={image} alt="no img"/>
                <p className="text text_type_digits-default">
                    {price} <CurrencyIcon type="primary"/>
                </p>
                <p>{name}</p>
            </div>
        </div>
    )
}

export default BurgerIngredientItem;