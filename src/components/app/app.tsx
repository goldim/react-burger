import React from 'react';
import './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerConstructor } from '../burger-constructor/burger-constructor'
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients'

import ingredientModel from '../../utils/data.json'

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <main>
        <BurgerIngredients model={ingredientModel}/>
        <BurgerConstructor model={ingredientModel}/>
      </main>
    </div>
  );
}

export default App;
