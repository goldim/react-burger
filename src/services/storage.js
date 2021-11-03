import { applyMiddleware, createStore } from 'redux'
import { rootReducer } from './reducers/root'
import thunk from 'redux-thunk'

export const ReduxStore = createStore(rootReducer, applyMiddleware(thunk));