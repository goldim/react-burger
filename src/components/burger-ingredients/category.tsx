import Ingredient from './ingredient'
import ingredientsStyles from './burger-ingredients.module.css';
import { FC, ReactNode } from 'react';
import { TRootState } from '../../services/types';
import { IDataItem } from '../../services/types/data-item-format';
import { useSelector } from '../../services/hooks';

interface ICategoryTitleProps {
    title: string
}

const CategoryTitle: FC<ICategoryTitleProps> = ({title}) => (
    <p id={title} className={`${ingredientsStyles.title} text text_type_main-medium`}>
        {title}
    </p>
);

interface IIngredientGridProps {
    children: ReactNode
}

const IngredientGrid: FC<IIngredientGridProps> = ({children}) => (
    <div className={`${ingredientsStyles.categoryList} ${ingredientsStyles.ingredientGrid}`}>
        { children }
    </div>
);

interface ICategoryProps {
    code: string,
    title: string
}

const Category: FC<ICategoryProps> = ({code, title}) => {
    const allIngredients = useSelector((store: TRootState) => store.ingredientsReducer.ingredients);
    const ingredientsInCategory = allIngredients.filter((ingr: IDataItem) => ingr.type === code);

    const renderItems = () => ingredientsInCategory.map((item: IDataItem) => renderRow(item))
    const renderRow = (firstItem: IDataItem) => (renderItem(firstItem))

    const renderItem = (item: IDataItem) => (
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

export default Category;