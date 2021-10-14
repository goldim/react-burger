import React from 'react';
import './App.css';
import { AppHeader } from './components/app-header/app-header';
import { BurgerConstructor } from './components/burger-constructor/burger-constructor'
import { BurgerIngredients } from './components/burger-ingredients/burger-ingredients'

import ingredientModel from './utils/data.json'

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
