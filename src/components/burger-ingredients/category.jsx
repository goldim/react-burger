import PropTypes from 'prop-types'

import Ingredient from './ingredient'
import ingredientsStyles from './burger-ingredients.module.css';
import DataItemPropTypes from '../../utils/data-item-format';

const Category = (props) => {
    const renderItems = () => {
        const result = [];
        const items = props.data;

        for (let i = 0; i < items.length; i += 2){
            const ingr = items[i];
            const nextIngr = items[i + 1];
            const element = renderRow(ingr, nextIngr, i);
            result.push(element);

        }
        return result;
    }

    const renderRow = (firstItem, secondItem, i) => (
        <li key={i} className={ingredientsStyles.noPointList}>
            { renderItem(firstItem) }
            { secondItem ? renderItem(secondItem) : <p></p>}
        </li>
    )

    const renderItem = (item) => (
        <Ingredient
            key={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
            extraDetails = {{
                fat: item.fat,
                calories: item.calories,
                carbohydrates: item.carbohydrates,
                proteins: item.proteins
            }}
            onClick={props.onItemClick}
            />
    )

    return (
        <div className={ingredientsStyles.category}>
            <p id={props.title} className={`${ingredientsStyles.title} text text_type_main-medium`}>
                {props.title}
            </p>
            <ul className={ingredientsStyles.categoryList}>
                { renderItems() }
            </ul>
        </div>
    )
}

Category.propTypes = {
    title: PropTypes.string.isRequired,
    onItemClick: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(DataItemPropTypes.isRequired).isRequired
}

export default Category;