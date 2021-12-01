import { LOGIN, LOGOUT, REGISTER, RESET_PASSWORD, SAVE_PASSWORD, UPDATE_PROFILE, LOAD_PROFILE_FAILED } from '../actions/auth';
import { changeUserRequest, getUserRequest, loginRequest, logoutRequest, registerRequest, resetPasswordRequest, sendRecoveryCodeRequest } from '../api';
import { deleteCookie, setCookie } from '../cookies';

const resetPasswordInternal = async (email, dispatch) => {
    await sendRecoveryCodeRequest(email);
    dispatch({ type: RESET_PASSWORD });
}

const resetPasswordInternal2 = async (password, token, dispatch) => {
    await resetPasswordRequest(password, token);
    dispatch({ type: SAVE_PASSWORD });
}

export const resetPassword = (email) => async (dispatch)  => {
    handleErrors(() => resetPasswordInternal(email, dispatch));
}

export const savePassword = (password, token) => async (dispatch)  => {
    handleErrors(() => resetPasswordInternal2(password, token, dispatch));
}

const registerNewUserInternal = async (name, password, email, dispatch) => {
    const data = await registerRequest(name, password, email);
    dispatch({ type: REGISTER, data });
}

export const registerNewUser = (name, password, email) => async (dispatch) => {
    handleErrors(() => registerNewUserInternal(name, password, email, dispatch));
}

const logoutInternal = async (dispatch) => {
    await logoutRequest();
    
    deleteCookie("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch({ type: LOGOUT });
}

const handleErrors = async func => {
    try{
        await func();
    } catch (ex) {
        console.log(ex.message)
    }
}

export const logout = () => async (dispatch)  => {
    handleErrors(() => logoutInternal(dispatch));
}

const loginInternal = async (email, password, dispatch) => {
    const data = await loginRequest(email, password);

    setCookie("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    dispatch({ type: LOGIN, data });
}

export const login = (email, password) => async (dispatch)  => {
    handleErrors(() => loginInternal(email, password, dispatch));
}

const updateProfileInternal = async (name, password, email, dispatch) => {
    const data = await changeUserRequest(name, password, email);
    dispatch({ type: UPDATE_PROFILE, data });
}

export const updateProfile = (name, password, email) => async (dispatch)  => {
    try {
        await updateProfileInternal(name, password, email, dispatch);
    } catch(ex){
        console.log(ex.message);
    }
}

const getUser = async (dispatch) => {
    const data = await getUserRequest();
    dispatch({ type: UPDATE_PROFILE, ...data });
}

export const getProfile = () => async (dispatch)  => {
    try {
        await getUser(dispatch);
    } catch (ex){
        console.log("profile failed", ex.message);
        dispatch({ type: LOAD_PROFILE_FAILED});
    }
}