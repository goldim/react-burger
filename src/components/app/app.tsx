import React from 'react';
import appStyles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerConstructor } from '../burger-constructor/burger-constructor'
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients'

function App() {
  const [ingredients, setIngredients] = React.useState([]);

  const onIngredientsLoaded = async (response: any) => {
    const parsed = await response.json();
    if (parsed.success){
      setIngredients(parsed.data);
    }
  }
  
  const onIngredientsLoadingFailed = () => {
    throw Error("loading of data failed");
  }
  
  const loadIngredients = () => {
    const INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';
    fetch(INGREDIENTS_URL)
      .then(onIngredientsLoaded)
      .catch(onIngredientsLoadingFailed);
  }

  React.useEffect(loadIngredients, []);

  return (
    <div className={ appStyles.App }>
      <AppHeader/>
      <main>
        <BurgerIngredients model={ingredients}/>
        <BurgerConstructor model={ingredients}/>
      </main>
    </div>
  );
}

export default App;
