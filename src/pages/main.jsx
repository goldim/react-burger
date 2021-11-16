import { ReduxStore } from '../services/storage'
import { Provider } from 'react-redux'

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AppHeader from '../components/app-header/app-header';
import BurgerCafe from '../components/app/burger-cafe';

const MainPage = () => {
  return (
    <>
        <AppHeader/>
        <main>
            <Provider store={ ReduxStore }>
                <DndProvider backend={HTML5Backend}>
                    <BurgerCafe/>
                </DndProvider>
            </Provider>
        </main>
    </>
  );
}

export default MainPage;