import PropTypes from 'prop-types'

import Ingredient from './ingredient'
import ingredientsStyles from './burger-ingredients.module.css';
import { useSelector } from 'react-redux';

const CategoryTitle = ({title}) => (
    <p id={title} className={`${ingredientsStyles.title} text text_type_main-medium`}>
        {title}
    </p>
);

const IngredientGrid = (props) => (
    <ul className={ingredientsStyles.categoryList}>
        { props.children }
    </ul>
);

const Category = ({code, title}) => {
    const allIngredients = useSelector(store => store.ingredientsReducer.ingredients);
    const ingredientsInCategory = allIngredients.filter(ingr => ingr.type === code);

    const renderItems = () => {
        const result = [];
        const items = ingredientsInCategory;

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
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
            isBun={item.type === "bun"}
            />
    )

    return (
        <div className={ingredientsStyles.category}>
            <CategoryTitle title={title}/>
            <IngredientGrid>
                { renderItems() }
            </IngredientGrid>
        </div>
    )
}

Category.propTypes = {
    title: PropTypes.string.isRequired
}

export default Category;