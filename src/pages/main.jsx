import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerCafe from '../components/app/burger-cafe';

const MainPage = () => (
  <DndProvider backend={HTML5Backend}>
      <BurgerCafe/>
  </DndProvider>
);

export default MainPage;