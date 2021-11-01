import { createStore } from 'redux'
import { rootReducer } from './reducers/root-reducer'

const ReduxStore = createStore(rootReducer);

export default ReduxStore;