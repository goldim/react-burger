import { LOGIN, LOGOUT, REGISTER, RESET_PASSWORD, SAVE_PASSWORD, UPDATE_PROFILE, LOAD_PROFILE_FAILED } from '../constants/auth';
import { changeUserRequest, getUserRequest, loginRequest, logoutRequest, registerRequest, resetPasswordRequest, sendRecoveryCodeRequest } from '../api';
import Cookies from 'js-cookie';
import { AppDispatch } from '../types';

const resetPasswordInternal = async (email: string, dispatch: AppDispatch) => {
    await sendRecoveryCodeRequest(email);
    dispatch({ type: RESET_PASSWORD });
}

const resetPasswordInternal2 = async (password: string, token: string, dispatch: AppDispatch) => {
    await resetPasswordRequest(password, token);
    dispatch({ type: SAVE_PASSWORD });
}

export const resetPassword = (email: string) => async (dispatch: AppDispatch)  => {
    handleErrors(() => resetPasswordInternal(email, dispatch));
}

export const savePassword = (password: string, token: string) => async (dispatch: AppDispatch)  => {
    handleErrors(() => resetPasswordInternal2(password, token, dispatch));
}

const registerNewUserInternal = async (name: string, password: string, email: string, dispatch: AppDispatch) => {
    const data = await registerRequest(name, password, email);
    dispatch({ type: REGISTER, data });
}

export const registerNewUser = (name: string, password: string, email: string) => async (dispatch: AppDispatch) => {
    handleErrors(() => registerNewUserInternal(name, password, email, dispatch));
}

const logoutInternal = async (dispatch: AppDispatch) => {
    await logoutRequest();
    
    Cookies.remove("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch({ type: LOGOUT });
}

const handleErrors = async (func: () => Promise<void>) => {
    try{
        await func();
    } catch (ex) {
        console.log((ex as Error).message)
    }
}

export const logout = () => async (dispatch: AppDispatch)  => {
    handleErrors(() => logoutInternal(dispatch));
}

const loginInternal = async (email: string, password: string, dispatch: AppDispatch) => {
    const data = await loginRequest(email, password);

    Cookies.set("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    dispatch({ type: LOGIN, data });
}

export const login = (email: string, password: string) => async (dispatch: AppDispatch)  => {
    handleErrors(() => loginInternal(email, password, dispatch));
}

const updateProfileInternal = async (name: string, password: string, email: string, dispatch: AppDispatch) => {
    const user = await changeUserRequest(name, password, email);
    dispatch({ type: UPDATE_PROFILE, user });
}

export const updateProfile = (name: string, password: string, email: string) => async (dispatch: AppDispatch)  => {
    try {
        await updateProfileInternal(name, password, email, dispatch);
    } catch(ex){
        console.log((ex as Error).message);
    }
}

const getUser = async (dispatch: AppDispatch) => {
    const data = await getUserRequest();
    dispatch({ type: UPDATE_PROFILE, ...data });
}

export const getProfile = () => async (dispatch: AppDispatch)  => {
    try {
        await getUser(dispatch);
    } catch (ex){
        console.log("profile failed", (ex as Error).message);
        dispatch({ type: LOAD_PROFILE_FAILED});
    }
}