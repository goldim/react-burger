import { createStore } from 'redux'
import { rootReducer } from './reducers/root'

export const ReduxStore = createStore(rootReducer);