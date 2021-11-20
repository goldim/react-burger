import { LOGIN, LOGOUT, REGISTER, RESET_PASSWORD, SAVE_PASSWORD, UPDATE_PROFILE } from '../actions/auth';

const ENDPOINT_URL = 'https://norma.nomoreparties.space/api/';
const LOGIN_URL = ENDPOINT_URL + 'auth/login';
const LOGOUT_URL = ENDPOINT_URL +  'auth/logout';
const REGISTER_URL = ENDPOINT_URL + 'auth/register';
const TOKEN_URL = ENDPOINT_URL + 'auth/token';
const RESET_PASSWORD_STEP_1_URL = ENDPOINT_URL + 'password-reset';
const RESET_PASSWORD_STEP_2_URL = ENDPOINT_URL + 'password-reset/reset';

const resetPasswordInternal = async (url, email, dispatch) => {
    const data = { email };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const data = await response.json();
        if (data.success){
            console.log(data.message);
            dispatch({ type: RESET_PASSWORD });
        } else {
            console.log(data.message);
        }
    } else {
        console.log("response failed");
    }
}

const resetPasswordInternal2 = async (url, password, token, dispatch) => {
    const data = { password, token };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

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
        await resetPasswordInternal(RESET_PASSWORD_STEP_1_URL, email, dispatch);
    } catch(ex){
        console.log(ex.message);
    }
}

export const savePassword = (password, token) => async (dispatch)  => {
    try {
        await resetPasswordInternal2(RESET_PASSWORD_STEP_2_URL, password, token, dispatch);
    } catch(ex){
        console.log(ex.message);
    }
}

const registerNewUserInternal = async (url, name, password, email, dispatch) => {
    const data = { email, password, name };
    console.log(data, JSON.stringify(data));

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

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
        await registerNewUserInternal(REGISTER_URL, name, password, email, dispatch);
    } catch(ex){
        console.log(ex.message);
    }
}

const logoutInternal = async (url, dispatch) => {
    const token = localStorage.getItem("refreshToken");
    const data = { token };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const data = await response.json();
        if (data.success){
            console.log(data.message);
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
        await logoutInternal(LOGOUT_URL, dispatch);
    } catch(ex){
        console.log(ex.message);
    }
}

const loginInternal = async (url, email, password, dispatch) => {
    const data = { email, password };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const data = await response.json();
        if (data.success){
            console.log("success", data);
            localStorage.setItem("accessToken", data.accessToken);
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
        await loginInternal(LOGIN_URL, email, password, dispatch);
    } catch(ex){
        console.log(ex.message);
    }
}

const updateProfileInternal = async (url, name, password, email, dispatch) => {
    const data = { name, password, email };
    const accessToken = localStorage.getItem("accessToken");

    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'authorization': accessToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

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

const PROFILE_URL = ENDPOINT_URL + 'auth/user';

export const updateProfile = (name, password, email) => async (dispatch)  => {
    try {
        await updateProfileInternal(PROFILE_URL, name, password, email, dispatch);
    } catch(ex){
        console.log(ex.message);
    }
}


