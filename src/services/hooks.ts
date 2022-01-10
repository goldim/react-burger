import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';
import { AppDispatch, AppThunk, TRootState } from './types';

export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>(); 
export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;