import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'

import { ReduxStore } from '../../services/storage'
import { Provider, useDispatch, useSelector } from 'react-redux'

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredients } from '../../services/middleware';
import { useEffect } from 'react';

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
  const {loadingFailed, isLoading} = useSelector(
    (store: any) => (store.ingredientsReducer));

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  if (loadingFailed){
    return (<InformMessage>Произошла ошибка при получении данных</InformMessage>);
  }
  else if (isLoading){
      return (<InformMessage>Загрузка...</InformMessage>);
  }
  else {
    return (
      <>
        <BurgerIngredients/>
        <BurgerConstructor/>
      </>
    );
  }
}

const InformMessage = (props: any) => <p className="text text_type_main-medium">{props.children}</p>

export default App;
