import { compose, applyMiddleware, createStore } from 'redux'
import { rootReducer } from './reducers/root'
import thunk from 'redux-thunk'

const composeEnhancers =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose; 

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const ReduxStore = createStore(rootReducer, enhancer);