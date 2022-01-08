import TotalBar from './total-bar'
import IngredientList from './ingredient-list'
import constructorStyles from './burger-constructor.module.css'
import { IDataItem } from '../../services/types/data-item-format'
import { useSelector } from '../../services/hooks'

const BurgerConstructor = () => {
    const {ids, allIngredients} = useSelector(
        store => ({
            allIngredients: store.ingredientsReducer.ingredients,
            ids: store.burgerConstruct.chosenIngredients
        })
    );

    const ingredientsInBurger: IDataItem[] = [];
    ids.forEach((id: string) => {
        const found = allIngredients.find((ingr: IDataItem) => ingr._id === id)
        if (found){
            ingredientsInBurger.push(found);
        }
    });

    return (
        <section className={constructorStyles.burgerConstructor}>
            <IngredientList ingredients={ingredientsInBurger}/>
            <TotalBar ingredients={ingredientsInBurger}/>
        </section>
    )
}

export default BurgerConstructor;