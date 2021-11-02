import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'

import { ReduxStore } from '../../services/storage'
import { Provider } from 'react-redux'

function App() {
  return (
    <>
      <div className={ appStyles.App }>
        <AppHeader/>
        <main>
          <Provider store={ ReduxStore }>
              <BurgerIngredients/>
              <BurgerConstructor/>
          </Provider>
        </main>
      </div>
      <div id="react-modals"/>
    </>
  );
}

export default App;
