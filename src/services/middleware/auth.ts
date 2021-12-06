import { LOGIN, LOGOUT, REGISTER, RESET_PASSWORD, SAVE_PASSWORD, UPDATE_PROFILE, LOAD_PROFILE_FAILED } from '../actions/auth';
import { changeUserRequest, getUserRequest, loginRequest, logoutRequest, registerRequest, resetPasswordRequest, sendRecoveryCodeRequest } from '../api';
import Cookies from 'js-cookie';
import { Dispatch } from 'react';

const resetPasswordInternal = async (email: string, dispatch: Dispatch<any>) => {
    await sendRecoveryCodeRequest(email);
    dispatch({ type: RESET_PASSWORD });
}

const resetPasswordInternal2 = async (password: string, token: string, dispatch: Dispatch<any>) => {
    await resetPasswordRequest(password, token);
    dispatch({ type: SAVE_PASSWORD });
}

export const resetPassword = (email: string) => async (dispatch: Dispatch<any>)  => {
    handleErrors(() => resetPasswordInternal(email, dispatch));
}

export const savePassword = (password: string, token: string) => async (dispatch: Dispatch<any>)  => {
    handleErrors(() => resetPasswordInternal2(password, token, dispatch));
}

const registerNewUserInternal = async (name: string, password: string, email: string, dispatch: Dispatch<any>) => {
    const data = await registerRequest(name, password, email);
    dispatch({ type: REGISTER, data });
}

export const registerNewUser = (name: string, password: string, email: string) => async (dispatch: Dispatch<any>) => {
    handleErrors(() => registerNewUserInternal(name, password, email, dispatch));
}

const logoutInternal = async (dispatch: Dispatch<any>) => {
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

export const logout = () => async (dispatch: Dispatch<any>)  => {
    handleErrors(() => logoutInternal(dispatch));
}

const loginInternal = async (email: string, password: string, dispatch: Dispatch<any>) => {
    const data = await loginRequest(email, password);

    Cookies.set("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    dispatch({ type: LOGIN, data });
}

export const login = (email: string, password: string) => async (dispatch: Dispatch<any>)  => {
    handleErrors(() => loginInternal(email, password, dispatch));
}

const updateProfileInternal = async (name: string, password: string, email: string, dispatch: Dispatch<any>) => {
    const data = await changeUserRequest(name, password, email);
    dispatch({ type: UPDATE_PROFILE, data });
}

export const updateProfile = (name: string, password: string, email: string) => async (dispatch: Dispatch<any>)  => {
    try {
        await updateProfileInternal(name, password, email, dispatch);
    } catch(ex){
        console.log((ex as Error).message);
    }
}

const getUser = async (dispatch: Dispatch<any>) => {
    const data = await getUserRequest();
    dispatch({ type: UPDATE_PROFILE, ...data });
}

export const getProfile = () => async (dispatch: Dispatch<any>)  => {
    try {
        await getUser(dispatch);
    } catch (ex){
        console.log("profile failed", (ex as Error).message);
        dispatch({ type: LOAD_PROFILE_FAILED});
    }
}