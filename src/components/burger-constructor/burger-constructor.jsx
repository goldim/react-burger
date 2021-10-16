import PropTypes from 'prop-types'

import TotalBar from './total-bar';
import { IngredientList } from './ingredient-list';
import constructorStyles from './burger-constructor.module.css';

const BurgerConstructor = ({data}) => {
    const calcTotalPrice = () => {
        return data.reduce((acc, current) => acc + current.price, 0);
    }

    return (
        <section className={constructorStyles.burgerConstructor}>
            <IngredientList ingredients={data}/>
            <TotalBar totalPrice={calcTotalPrice()}/>
        </section>
    )
}

// const menuItemPropTypes = PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     type: PropTypes.string.isRequired,
//     proteins: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     carbohydrates: PropTypes.number.isRequired,
//     calories: PropTypes.number.isRequired,
//     price: PropTypes.number.isRequired,
//     image: PropTypes.string.isRequired,
//     image_mobile: PropTypes.string.isRequired,
//     image_large: PropTypes.string.isRequired,
//     __v: PropTypes.number.isRequired,
// });

BurgerConstructor.propTypes = {
    data: PropTypes.array
}

export default BurgerConstructor;