import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import { IngredientsContext } from './ingredients-context'

import { ReduxStore } from '../../services/storage'
import { Provider } from 'react-redux'

import { useEffect, useState } from 'react';

const INGREDIENTS_SOURCE = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [ingredients, setIngredients] = useState([]);

  const fetchIngredients = async (url: string) => {
    const response = await fetch(url);

    if (response.ok) {
      const json = await response.json();
      setIngredients(json.data);
    } else {
      throw new Error(response.status.toString());
    }
  }

  useEffect(() => { 
    const loadIngredients = async () => {
      try {
        await fetchIngredients(INGREDIENTS_SOURCE);
      }
      catch (e){
        console.log(e);
      }
    }

    loadIngredients();
  }, []);

  return (
    <>
      <div className={ appStyles.App }>
        <AppHeader/>
        <main>
          <Provider store={ ReduxStore }>
            <IngredientsContext.Provider value={ingredients}>
              <BurgerIngredients/>
              <BurgerConstructor/>
            </IngredientsContext.Provider>
          </Provider>
        </main>
      </div>
      <div id="react-modals"/>
    </>
  );
}

export default App;
