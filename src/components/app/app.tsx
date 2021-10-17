import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor'
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients'

const INGREDIENTS_SOURCE = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [ingredients, setIngredients] = React.useState([]);

  const fetchIngredients = async (url: string) => {
    const response = await fetch(url);

    if (response.ok) {
      const json = await response.json();
      setIngredients(json.data);
    } else {
      throw new Error(response.status.toString());
    }
  }

  React.useEffect(() => { 
    const loadIngredients = async () => {
      try {
        await fetchIngredients(INGREDIENTS_SOURCE);
      }
      catch (e){
        console.log(e);
      }
    }

    loadIngredients() 
  }, []);

  return (
    <>
      <div className={ appStyles.App }>
        <AppHeader/>
        <main>
          <BurgerIngredients data={ingredients}/>
          <BurgerConstructor data={ingredients}/>
        </main>
      </div>
      <div id="react-modals"/>
    </>
  );
}

export default App;
