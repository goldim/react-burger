import React from 'react';
import PropTypes from 'prop-types';

import styles from './ingredient-details.module.css'

const SmallText = React.memo((props) => (
    <p className="text text_type_main-small text_color_inactive">{props.children}</p>
));

const InactiveNumber = React.memo((props) => (
    <p className="text text_type_digits-default text_color_inactive">{props.children}</p>
));

const IngredientDetails = (props) => (
    <div className={styles.container}>
        <div>
            <div>
                <img src={props.image} alt={props.name}/>
                <p className={`${styles.name} text text_type_main-medium`}>
                    {props.name}
                </p>
                <div className={styles.subInfo}>
                    <SmallText>Калории, ккал</SmallText>
                    <SmallText>Белки, г</SmallText>
                    <SmallText>Жиры, г</SmallText>
                    <SmallText>Углеводы, г</SmallText>
                    <InactiveNumber>{props.calories}</InactiveNumber>
                    <InactiveNumber>{props.proteins}</InactiveNumber>
                    <InactiveNumber>{props.fat}</InactiveNumber>
                    <InactiveNumber>{props.carbohydrates}</InactiveNumber>
                </div>
            </div>
        </div>
    </div>
)

IngredientDetails.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    calories: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number
}

export default IngredientDetails;