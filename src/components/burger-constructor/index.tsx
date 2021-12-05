import TotalBar from './total-bar'
import IngredientList from './ingredient-list'
import constructorStyles from './burger-constructor.module.css'
import { useSelector } from 'react-redux'
import { IDataItem } from '../../utils/data-item-format'

const BurgerConstructor = () => {
    const {ids, allIngredients} = useSelector(
        (store: any) => ({
            allIngredients: store.ingredientsReducer.ingredients,
            ids: store.burgerConstruct.chosenIngredients
        })
    );

    const ingredientsInBurger: IDataItem[] = [];
    ids.forEach((id: string) => ingredientsInBurger.push(allIngredients.find((ingr: IDataItem) => ingr._id === id)));

    return (
        <section className={constructorStyles.burgerConstructor}>
            <IngredientList ingredients={ingredientsInBurger}/>
            <TotalBar ingredients={ingredientsInBurger}/>
        </section>
    )
}

export default BurgerConstructor;