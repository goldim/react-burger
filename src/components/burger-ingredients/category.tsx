import Ingredient from './ingredient'
import ingredientsStyles from './burger-ingredients.module.css';
import { useSelector } from 'react-redux';
import { FC, ReactNode } from 'react';

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
    <div style={{display:"grid", gridTemplateColumns: "auto auto"}} className={ingredientsStyles.categoryList}>
        { children }
    </div>
);

interface ICategoryProps {
    code: string,
    title: string
}

const Category: FC<ICategoryProps> = ({code, title}) => {
    const allIngredients = useSelector((store: any) => store.ingredientsReducer.ingredients);
    const ingredientsInCategory = allIngredients.filter((ingr: any) => ingr.type === code);

    const renderItems = () => ingredientsInCategory.map((item:any) => renderRow(item))
    const renderRow = (firstItem: any) => (renderItem(firstItem))

    const renderItem = (item: any) => (
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