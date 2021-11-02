import TotalBar from './total-bar'
import IngredientList from './ingredient-list'
import constructorStyles from './burger-constructor.module.css'
import { useSelector } from 'react-redux'

const BurgerConstructor = () => {
    const extractBuns = (data) => {
        return data.filter(ingr => ingr.type !== "bun");
    }

    const getBun = (data) => {
        return data.find(ingr => ingr.type === "bun");
    }

    const addBunToEnds = (a, bun) => {
        if (bun){
            a.unshift(Object.assign({}, bun));
            a.push(Object.assign({}, bun));
        }
    }

    const {ids, allIngredients} = useSelector(
        store => { return {
            ids: store.burgerConstruct.chosenIngredients,
            allIngredients: store.ingredientsReducer.ingredients
        }}
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