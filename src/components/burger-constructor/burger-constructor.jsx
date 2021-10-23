import TotalBar from './total-bar'
import IngredientList from './ingredient-list'
import constructorStyles from './burger-constructor.module.css'
import { useContext } from 'react'
import { IngredientsContext } from '../app/ingredients-context'

const BurgerConstructor = () => {
    const randomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    const makeRandomBurgerIngredients = (ingredients) => {
        let count = randomNumber(0, ingredients.length - 1);
        const result = [];
        const a = ingredients.slice();
        while (count--){
            const index = randomNumber(0, a.length - 1);
            result.push(Object.assign({}, a[index]));
            a.splice(index, 1);
        }
        return result;
    }

    const extractBuns = (data) => {
        return data.filter(ingr => ingr.type !== "bun");
    }

    const getBun = (data) => {
        return data.find(ingr => ingr.name === "Краторная булка N-200i");
    }

    const addBunToEnds = (a, bun) => {
        a.unshift(Object.assign({}, bun));
        a.push(Object.assign({}, bun));
    }

    const allIngredients = useContext(IngredientsContext);
    let ingredientsInBurger = [];
    if (allIngredients.length > 0){
        ingredientsInBurger = makeRandomBurgerIngredients(extractBuns(allIngredients));
        addBunToEnds(ingredientsInBurger, getBun(allIngredients));
    }

    return (
        <section className={constructorStyles.burgerConstructor}>
            <IngredientList ingredients={ingredientsInBurger}/>
            <TotalBar ingredients={ingredientsInBurger}/>
        </section>
    )
}

export default BurgerConstructor;