import {useLayoutEffect, useState} from 'react'

import Category from './category';
import CategoryBar from './category-bar';
import ingredientsStyles from './burger-ingredients.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details.jsx/ingredient-details';

import { LOAD_INGREDIENTS_FROM_SERVER } from '../../services/actions/load-ingredients'
import { useDispatch, useSelector } from 'react-redux';

import dictionary from '../../utils/dictionary.json'

const getCategoryDescriptions = (ingredients) => {
    const categories = [...new Set(ingredients.map(ingr => ingr.type))];

    const result = categories.map(type => {
        if (dictionary[type]){
            return {
                code: type,
                title: dictionary[type].ru
            }
        }
        return {
            code: type,
            title: type
        }
    });

    return result;
}

const BurgerIngredients = () => {
    const newIngredients = useSelector(store => {
        return store.loadAPI.ingredients;
    });

    const dispatch = useDispatch();

    useLayoutEffect(() => {
        dispatch({ type: LOAD_INGREDIENTS_FROM_SERVER });
    }, []);

    const [state, setState] = useState({
        showDetails: false,
        chosenItem: {}
    });

    const getIngredientsByType = (type) => {
        return newIngredients.filter(ingr => ingr.type === type)
    }

    const renderCategoriesBlock = () => (
        <div className={ingredientsStyles.categoryBlock}>
            {renderCategories()}
        </div>
    )

    const renderCategories = () => {
        return getCategoryDescriptions(newIngredients).map(desc => renderCategory(desc.code, desc.title));
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

    const renderCategory = (code, title) => {
        return (
            <Category key={code} title={title} data={getIngredientsByType(code)} onItemClick={onItemClick}/>
        )
    }

    const getCategoryTitles = () => {
        return getCategoryDescriptions(newIngredients).map(cat => cat.title);
    }

    const moveTo = (a) => {
        document.getElementById(a).scrollIntoView();
    }

    return (
        <section className={ingredientsStyles.ingredientsMenu}>
            <CombineBurgerTitle/>
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

const CombineBurgerTitle = () => (
    <p className={`${ingredientsStyles.title} text text_type_main-large`}>
        Соберите бургер
    </p>
);

export default BurgerIngredients;