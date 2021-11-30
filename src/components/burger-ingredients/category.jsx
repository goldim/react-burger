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
    <div style={{display:"grid", gridTemplateColumns: "auto auto"}} className={ingredientsStyles.categoryList}>
        { props.children }
    </div>
);

const Category = ({code, title}) => {
    const allIngredients = useSelector(store => store.ingredientsReducer.ingredients);
    const ingredientsInCategory = allIngredients.filter(ingr => ingr.type === code);

    const renderItems = () => ingredientsInCategory.map((item) => renderRow(item))
    const renderRow = (firstItem) => (renderItem(firstItem))

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