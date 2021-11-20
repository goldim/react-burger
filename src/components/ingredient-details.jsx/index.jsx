import React from 'react';
import PropTypes from 'prop-types';

import styles from './ingredient-details.module.css'
import { useSelector } from 'react-redux';

const SmallText = React.memo(({children}) => (
    <p className="text text_type_main-small text_color_inactive">{children}</p>
));

SmallText.propTypes = {
    children: PropTypes.string.isRequired
}

const InactiveNumber = React.memo(({children}) => (
    <p className="text text_type_digits-default text_color_inactive">{children}</p>
));

InactiveNumber.propTypes = {
    children: PropTypes.number.isRequired
}

const IngredientDetails = () => {
    const current = useSelector(store => store.ingredientsReducer.currentIngredient);
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