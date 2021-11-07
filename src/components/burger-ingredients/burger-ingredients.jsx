import Category from './category';
import CategoryBar from './category-bar';
import ingredientsStyles from './burger-ingredients.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details.jsx/ingredient-details';

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

const onIngredientsRendered = (descriptions, dispatch) => {
    descriptions.forEach(desc => {
        dispatch({
            type: ADD_CATEGORY_ID,
            id: desc.title
        });
    });
};

const BurgerIngredients = () => {
    const dispatch = useDispatch();
    const newIngredients = useSelector(store => store.ingredientsReducer.ingredients);
    const current = useSelector(store => store.ingredientsReducer.currentIngredient);
    const categoryDescriptions = getCategoryDescriptions(newIngredients);
    const getCategoryTitles = () => categoryDescriptions.map(cat => cat.title);
    const onCloseItem = () => dispatch({type: CLEAR_CURRENT_INGREDIENT})
    useEffect(()=> { onIngredientsRendered(categoryDescriptions, dispatch)}, [categoryDescriptions, dispatch]);

    return (
        <section className={ingredientsStyles.ingredientsMenu}>
            <CombineBurgerTitle/>
            <div className={ingredientsStyles.menuContent}>
                <CategoryBar titles={getCategoryTitles()}/>
                <CategoriesContainer>
                    {
                        categoryDescriptions.map(desc => <Category key={desc.code} code={desc.code} title={desc.title}/>)
                    }
                </CategoriesContainer>
            </div>
            <Modal caption="Детали ингредиента" show={!!current._id} closeHandler={onCloseItem}>
                <IngredientDetails/>
            </Modal>
        </section>
    )
}

const CategoriesContainer = (props) => {
    const scrollableList = useRef(null);
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