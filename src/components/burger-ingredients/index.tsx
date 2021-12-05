import Category from './category';
import CategoryBar from './category-bar';
import ingredientsStyles from './burger-ingredients.module.css';
import Modal from '../modal';
import IngredientDetails from '../ingredient-details';

import { useDispatch, useSelector } from 'react-redux';

import * as dictionary from '../../utils/dictionary.json'
import { CHANGE_CURRENT_CATEGORY_BY_DISTANCE, CLEAR_CURRENT_INGREDIENT } from '../../services/actions/burger-ingredients';
import { Dispatch, FC, ReactNode, useEffect, useRef } from 'react';

import { ADD_CATEGORY_ID } from '../../services/actions/burger-ingredients';
import { IDataItem, TDataItems } from '../../utils/data-item-format';

type TDictionary = {
    [type: string]: any
};

const getCategoryDescriptions = (ingredients: TDataItems) => {
    const categories = Array.from(new Set(ingredients.map((ingr: IDataItem) => ingr.type)).values());
    const dict = (dictionary as TDictionary).default;

    const result = categories.map(type => {
        console.log(typeof dict[type]);
        if (dict[type]){
            return {
                code: type,
                title: dict[type]['ru']
            }
        }
        return {
            code: type,
            title: type
        }
    });

    return result;
}

const onIngredientsRendered = (descriptions: any[], dispatch: Dispatch<any>) => {
    descriptions.forEach(desc => {
        dispatch({
            type: ADD_CATEGORY_ID,
            id: desc.title
        });
    });
};

const BurgerIngredients = () => {
    const dispatch = useDispatch();
    const newIngredients = useSelector((store: any) => store.ingredientsReducer.ingredients);
    const current = useSelector((store: any) => store.ingredientsReducer.currentIngredient);
    const categoryDescriptions = getCategoryDescriptions(newIngredients);
    const getCategoryTitles = () => categoryDescriptions.map(cat => cat.title);
    const onCloseItem = () => {
        window.history.replaceState(null, "", "/constructor");
        dispatch({type: CLEAR_CURRENT_INGREDIENT})
    }
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

interface ICategoriesContainerProps {
    children: ReactNode
}

const CategoriesContainer: FC<ICategoriesContainerProps> = ({children}) => {
    const scrollableList = useRef<HTMLInputElement | null>(null);
    const dispatch = useDispatch();
    useEffect(() => {
        function handleNavigation(e: Event) {
            if (scrollableList && scrollableList.current){
                dispatch({
                    type: CHANGE_CURRENT_CATEGORY_BY_DISTANCE,
                    distance: scrollableList.current.getBoundingClientRect().y
                });
            }
        }
        if (scrollableList && scrollableList.current){
            scrollableList.current.addEventListener("scroll", handleNavigation);
        }
    }, [scrollableList, dispatch]);

    return (
        <div className={ingredientsStyles.categoryBlock} ref={scrollableList}>
            { children }
        </div>
    );
}

const CombineBurgerTitle = () => (
    <p className={`${ingredientsStyles.title} text text_type_main-large`}>
        Соберите бургер
    </p>
);

export default BurgerIngredients;