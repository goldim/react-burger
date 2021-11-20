import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerCafe from '../components/app/burger-cafe';
import PageWithAppHeader from '../components/page-with-app-header';

const MainPage = () => (
  <PageWithAppHeader>
      <DndProvider backend={HTML5Backend}>
          <BurgerCafe/>
      </DndProvider>
  </PageWithAppHeader>
);

export default MainPage;