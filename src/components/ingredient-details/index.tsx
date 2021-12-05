import { memo, useEffect } from 'react';

import styles from './ingredient-details.module.css'
import { useSelector } from 'react-redux';

interface ISmallTextProps {
    children: string
}

const SmallText = memo(({children}: ISmallTextProps) => (
    <p className="text text_type_main-small text_color_inactive">{children}</p>
));

interface IInactiveNumberProps {
    children: number
}

const InactiveNumber = memo(({children}: IInactiveNumberProps) => (
    <p className="text text_type_digits-default text_color_inactive">{children}</p>
));

const IngredientDetails = () => {
    const current = useSelector((store: any) => store.ingredientsReducer.currentIngredient);
    useEffect(() => {
        window.history.replaceState(null, "", "/ingredients/" + current._id);
    }, [current._id]);
    return (
        <div className={styles.container}>
            <div>
                <div>
                    <img src={current.image} alt={current.name}/>
                    <p className={`${styles.name} text text_type_main-medium`}>
                        {current.name}
                    </p>
                    <div className={styles.subInfo}>
                        <SmallText>Калории, ккал</SmallText>
                        <SmallText>Белки, г</SmallText>
                        <SmallText>Жиры, г</SmallText>
                        <SmallText>Углеводы, г</SmallText>
                        <InactiveNumber>{current.calories}</InactiveNumber>
                        <InactiveNumber>{current.proteins}</InactiveNumber>
                        <InactiveNumber>{current.fat}</InactiveNumber>
                        <InactiveNumber>{current.carbohydrates}</InactiveNumber>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IngredientDetails;