import { LOGIN, LOGOUT, REGISTER, RESET_PASSWORD, SAVE_PASSWORD, UPDATE_PROFILE, LOAD_PROFILE_FAILED } from '../actions/auth';
import { changeUserRequest, getUserRequest, loginRequest, logoutRequest, registerRequest, resetPasswordRequest, sendRecoveryCodeRequest } from '../api';
import { deleteCookie, setCookie } from '../cookies';

const resetPasswordInternal = async (email, dispatch) => {
    const response = await sendRecoveryCodeRequest(email);

    if (response.ok) {
        const data = await response.json();
        if (data.success){
            dispatch({ type: RESET_PASSWORD });
        } else {
            console.log(data.message);
        }
    } else {
        console.log("response failed");
    }
}

const resetPasswordInternal2 = async (password, token, dispatch) => {
    const response = await resetPasswordRequest(password, token);

    if (response.ok) {
        const data = await response.json();
        if (data.success){
            console.log(data.message);
            dispatch({ type: SAVE_PASSWORD });
        } else {
            console.log(data.message);
        }
    } else {
        console.log("response failed");
    }
}

export const resetPassword = (email) => async (dispatch)  => {
    try {
        await resetPasswordInternal(email, dispatch);
    } catch(ex){
        console.log(ex.message);
    }
}

export const savePassword = (password, token) => async (dispatch)  => {
    try {
        await resetPasswordInternal2(password, token, dispatch);
    } catch(ex){
        console.log(ex.message);
    }
}

const registerNewUserInternal = async (name, password, email, dispatch) => {
    const response = await registerRequest(name, password, email);

    if (response.ok) {
        const data = await response.json();
        if (data.success){
            dispatch({ type: REGISTER, data });
        } else {
            console.log(data.message);
        }
    } else {
        console.log("response failed", response.statusText);
    }
}

export const registerNewUser = (name, password, email) => async (dispatch)  => {
    try {
        await registerNewUserInternal(name, password, email, dispatch);
    } catch(ex){
        console.log(ex.message);
    }
}

const logoutInternal = async (dispatch) => {
    const response = await logoutRequest();

    if (response.ok) {
        const data = await response.json();
        if (data.success){
            deleteCookie("accessToken");
            localStorage.removeItem("refreshToken");
            dispatch({ type: LOGOUT });
        } else {
            console.log(data.message);
        }
    } else {
        console.log("response failed");
    }
}

export const logout = () => async (dispatch)  => {
    try {
        await logoutInternal(dispatch);
    } catch(ex){
        console.log(ex.message);
    }
}

const loginInternal = async (email, password, dispatch) => {
    const response = await loginRequest(email, password);

    if (response.ok) {
        const data = await response.json();
        if (data.success){
            setCookie("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            dispatch({ type: LOGIN, data });
        } else {
            console.log(data.message);
        }
    } else {
        console.log("response failed");
    }
}

export const login = (email, password) => async (dispatch)  => {
    try {
        await loginInternal(email, password, dispatch);
    } catch(ex){
        console.log(ex.message);
    }
}

const updateProfileInternal = async (name, password, email, dispatch) => {
    const response = await changeUserRequest(name, password, email);

    if (response.ok) {
        const data = await response.json();
        if (data.success){
            dispatch({ type: UPDATE_PROFILE, data });
        } else {
            console.log(data.message);
        }
    } else {
        console.log("response failed");
    }
}

export const updateProfile = (name, password, email) => async (dispatch)  => {
    try {
        await updateProfileInternal(name, password, email, dispatch);
    } catch(ex){
        console.log(ex.message);
    }
}

const getUser = async (dispatch) => {
    const response = await getUserRequest();

    if (response.ok) {
        const data = await response.json();
        if (data.success){
            dispatch({ type: UPDATE_PROFILE, ...data });
        } else {
            console.log(data.message);
        }
    } else {
        dispatch({ type: LOAD_PROFILE_FAILED});
        console.log("response failed", response.statusText);
    }
}

export const getProfile = () => async (dispatch)  => {
    try {
        await getUser(dispatch);
    } catch(ex){
        console.log(ex.message);
    }
}