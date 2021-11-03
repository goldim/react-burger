import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'

import { ReduxStore } from '../../services/storage'
import { Provider, useDispatch } from 'react-redux'

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredients } from '../../services/middleware';

function App() {
  return (
    <>
      <div className={ appStyles.App }>
        <AppHeader/>
        <main>
          <Provider store={ ReduxStore }>
            <DndProvider backend={HTML5Backend}>
              <BurgerCafe/>
            </DndProvider>
          </Provider>
        </main>
      </div>
      <div id="react-modals"/>
    </>
  );
}

const BurgerCafe = () => {
  const dispatch = useDispatch();
  dispatch(getIngredients());

  return (
    <>
      <BurgerIngredients/>
      <BurgerConstructor/>
    </>
  );
}

export default App;
