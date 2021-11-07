import TotalBar from './total-bar'
import IngredientList from './ingredient-list'
import constructorStyles from './burger-constructor.module.css'
import { useSelector } from 'react-redux'

const BurgerConstructor = () => {
    const {ids, allIngredients} = useSelector(
        store => ({
            allIngredients: store.ingredientsReducer.ingredients,
            ids: store.burgerConstruct.chosenIngredients
        })
    );

    const ingredientsInBurger = [];
    ids.forEach(id => {
        ingredientsInBurger.push(allIngredients.find(ingr => ingr._id === id));
    });

    return (
        <section className={constructorStyles.burgerConstructor}>
            <IngredientList ingredients={ingredientsInBurger}/>
            <TotalBar ingredients={ingredientsInBurger}/>
        </section>
    )
}

export default BurgerConstructor;