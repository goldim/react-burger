import Category from './category';
import CategoryBar from './category-bar';
import ingredientsStyles from './burger-ingredients.module.css';
import Modal from '../modal';
import IngredientDetails from '../ingredient-details';

import * as dictionary from '../../utils/dictionary.json'
import { FC, ReactNode, useEffect, useRef } from 'react';

import { IDataItem, TDataItems } from '../../services/types/data-item-format';
import { AppDispatch } from '../../services/types';
import { useDispatch, useSelector } from '../../services/hooks';
import { addCategoryId, changeCurrentCategoryByDistance, clearCurrentIngredient } from '../../services/actions/burger-ingredients';

type TDictionary = {
    [type: string]: any
};

interface ICategoryDescription {
    code: string,
    title: string
}

type TCategoryDescriptions = ReadonlyArray<ICategoryDescription>;

const getCategoryDescriptions = (ingredients: TDataItems): TCategoryDescriptions => {
    const categories = Array.from(new Set(ingredients.map((ingr: IDataItem) => ingr.type)).values());
    const dict = (dictionary as TDictionary).default;

    const result = categories.map(type => {
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

const onIngredientsRendered = (descriptions: TCategoryDescriptions, dispatch: AppDispatch) => {
    descriptions.forEach(desc => {
        dispatch(addCategoryId(desc.title));
    });
};

const BurgerIngredients = () => {
    const dispatch = useDispatch() as  AppDispatch;
    const newIngredients = useSelector(store => store.ingredientsReducer.ingredients);
    const current = useSelector(store => store.ingredientsReducer.currentIngredient);
    const categoryDescriptions = getCategoryDescriptions(newIngredients);
    const getCategoryTitles = () => categoryDescriptions.map(cat => cat.title);
    const onCloseItem = () => {
        window.history.replaceState(null, "", "/constructor");
        dispatch(clearCurrentIngredient())
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
                dispatch(changeCurrentCategoryByDistance(scrollableList.current.getBoundingClientRect().y));
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