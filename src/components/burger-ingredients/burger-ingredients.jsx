import {useContext, useState} from 'react'

import Category from './category';
import CategoryBar from './category-bar';
import ingredientsStyles from './burger-ingredients.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details.jsx/ingredient-details';
import { IngredientsContext } from '../app/ingredients-context';

const BurgerIngredients = (props) => {
    const [state, setState] = useState({
        showDetails: false,
        chosenItem: {}
    });
    const data = useContext(IngredientsContext);

    const getIngredientsByType = (type) => {
        const ingredients = data;
        return ingredients.filter(ingr => ingr.type === type)
    }

    const renderCategoriesBlock = () => (
        <div className={ingredientsStyles.categoryBlock}>
            {renderCategories()}
        </div>
    )

    const renderCategories = () => {
        const result = [];
        getCategoryDescriptions().forEach(desc => {
            result.push(renderCategory(desc.code, desc.title));
        });
        return result;
    }

    const onCloseItem = () => {
        setState({
            ...state,
            showDetails: false
        });
    }

    const onItemClick = (props) => {
        setState({
            ...state,
            showDetails: true,
            chosenItem: {
                ...props
            }
        });
    }

    const renderCategory = (code, title) => (
        <Category key={code} title={title} data={getIngredientsByType(code)} onItemClick={onItemClick}/>
    )

    const getCategoryDescriptions = () => {
        return [
            {
                code: "bun",
                title: "Булки"
            },
            {
                code: "sauce",
                title: "Соусы"
            },
            {
                code: "main",
                title: "Начинки"
            }
        ];
    }

    const getCategoryTitles = () => {
        return getCategoryDescriptions().map(cat => cat.title);
    }

    const moveTo = (a) => {
        document.getElementById(a).scrollIntoView();
    }

    const renderCombineBurgerTitle = () => (
        <p className={`${ingredientsStyles.title} text text_type_main-large`}>
            Соберите бургер
        </p>
    )

    return (
        <section className={ingredientsStyles.ingredientsMenu}>
            { renderCombineBurgerTitle() }
            <div className={ingredientsStyles.menuContent}>
                <CategoryBar titles={getCategoryTitles()} onTabHandler={moveTo}/>
                { renderCategoriesBlock() }
            </div>
            <Modal caption="Детали ингредиента" show={state.showDetails} closeHandler={onCloseItem}>
                <IngredientDetails {...state.chosenItem}/>
            </Modal>
        </section>
    )
}

export default BurgerIngredients;