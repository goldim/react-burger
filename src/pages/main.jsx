import { ReduxStore } from '../services/storage'
import { Provider } from 'react-redux'

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerCafe from '../components/app/burger-cafe';
import PageWithAppHeader from '../components/page-with-app-header';

const MainPage = () => (
  <PageWithAppHeader>
    <Provider store={ ReduxStore }>
        <DndProvider backend={HTML5Backend}>
            <BurgerCafe/>
        </DndProvider>
    </Provider>
  </PageWithAppHeader>
);


export default MainPage;