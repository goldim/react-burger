import { ReduxStore } from '../storage'
import { TAuthActions } from '../actions/auth'
import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { TBurgerIngredientsActions } from '../actions/burger-ingredients';
import { TBurgerConstructorActions } from '../actions/burger-constructor';
import { TOrderActions } from '../actions/order';
import { TWebsocketActions } from '../actions/websocket';

type TAppActions = TAuthActions | TBurgerIngredientsActions | TBurgerConstructorActions | TOrderActions | TWebsocketActions;

export type TRootState = ReturnType<typeof ReduxStore.getState>;
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, TRootState, TAppActions>>;
export type AppDispatch = Dispatch<TAppActions>;