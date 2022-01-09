import { compose, applyMiddleware, createStore } from 'redux'
import { rootReducer } from './reducers/root'
import thunk from 'redux-thunk'
import { websocket } from './middleware/websocket';

const composeEnhancers =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose; 

const websocketMiddleware = websocket()
const enhancer = composeEnhancers(applyMiddleware(thunk, websocketMiddleware));

export const ReduxStore = createStore(rootReducer, enhancer);