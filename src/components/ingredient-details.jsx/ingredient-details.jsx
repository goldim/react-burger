import React from 'react';
import PropTypes from 'prop-types';

import styles from './ingredient-details.module.css'

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

const IngredientDetails = ({name, image, calories, proteins, fat, carbohydrates}) => (
    <div className={styles.container}>
        <div>
            <div>
                <img src={image} alt={name}/>
                <p className={`${styles.name} text text_type_main-medium`}>
                    {name}
                </p>
                <div className={styles.subInfo}>
                    <SmallText>Калории, ккал</SmallText>
                    <SmallText>Белки, г</SmallText>
                    <SmallText>Жиры, г</SmallText>
                    <SmallText>Углеводы, г</SmallText>
                    <InactiveNumber>{calories}</InactiveNumber>
                    <InactiveNumber>{proteins}</InactiveNumber>
                    <InactiveNumber>{fat}</InactiveNumber>
                    <InactiveNumber>{carbohydrates}</InactiveNumber>
                </div>
            </div>
        </div>
    </div>
)

IngredientDetails.defaultProps = {
    name: "",
    image: "",
    calories: 0,
    proteins: 0,
    fat: 0,
    carbohydrates: 0
}

IngredientDetails.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired
}

export default IngredientDetails;