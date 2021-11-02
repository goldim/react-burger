import Category from './category';
import CategoryBar from './category-bar';
import ingredientsStyles from './burger-ingredients.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details.jsx/ingredient-details';

import { LOAD_INGREDIENTS } from '../../services/actions/load-ingredients'
import { useDispatch, useSelector } from 'react-redux';

import dictionary from '../../utils/dictionary.json'
import { CHANGE_CURRENT_CATEGORY_BY_DISTANCE, CLEAR_CURRENT_INGREDIENT } from '../../services/actions/burger-ingredients';
import { useEffect, useRef } from 'react';

import { ADD_CATEGORY_ID } from '../../services/actions/burger-ingredients';

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
        return store.ingredientsReducer.ingredients;
    });

    const dispatch = useDispatch();
    dispatch({ type: LOAD_INGREDIENTS });

    const getIngredientsByType = (type) => {
        return newIngredients.filter(ingr => ingr.type === type)
    }

    const renderCategories = () => {
        return getCategoryDescriptions(newIngredients).map(desc => renderCategory(desc.code, desc.title));
    }

    const renderCategory = (code, title) => {
        dispatch({
            type: ADD_CATEGORY_ID,
            id: title
        });

        return (
            <Category key={code} title={title} data={getIngredientsByType(code)}/>
        )
    }

    const getCategoryTitles = () => {
        return getCategoryDescriptions(newIngredients).map(cat => cat.title);
    }

    const current = useSelector(store => store.ingredientsReducer.currentIngredient);
    const onCloseItem = () => {
        dispatch({
            type: CLEAR_CURRENT_INGREDIENT
        });
    }

    return (
        <section className={ingredientsStyles.ingredientsMenu}>
            <CombineBurgerTitle/>
            <div className={ingredientsStyles.menuContent}>
                <CategoryBar titles={getCategoryTitles()}/>
                <CategoriesBlock>
                    { renderCategories() }
                </CategoriesBlock>
            </div>
            <Modal caption="Детали ингредиента" show={!!current._id} closeHandler={onCloseItem}>
                <IngredientDetails/>
            </Modal>
        </section>
    )
}

const CategoriesBlock = (props) => {
    const scrollableList = useRef();
    const dispatch = useDispatch();
    useEffect(() => {
        function handleNavigation(e) {
            dispatch({
                type: CHANGE_CURRENT_CATEGORY_BY_DISTANCE,
                distance: scrollableList.current.getBoundingClientRect().y
            });
        }
        scrollableList.current.addEventListener("scroll", handleNavigation);
    }, [scrollableList, dispatch]);

    return (
        <div className={ingredientsStyles.categoryBlock} ref={scrollableList}>
            { props.children }
        </div>
    );
}

const CombineBurgerTitle = () => (
    <p className={`${ingredientsStyles.title} text text_type_main-large`}>
        Соберите бургер
    </p>
);

export default BurgerIngredients;