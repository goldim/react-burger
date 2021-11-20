import { RESET_PASSWORD } from '../actions/auth';

const LOGIN_URL = 'https://norma.nomoreparties.space/api/auth/login';
const LOGOUT_URL = 'https://norma.nomoreparties.space/api/auth/logout';
const REGISTER_URL = 'https://norma.nomoreparties.space/api/auth/register';
const TOKEN_URL = 'https://norma.nomoreparties.space/api/auth/token';
const RESET_PASSWORD_URL = 'https://norma.nomoreparties.space/api/password-reset';

const sentEmail = async (url, email, dispatch) => {
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

export const resetPassword = (email) => async (dispatch)  => {
    try {
        await sentEmail(RESET_PASSWORD_URL, email, dispatch);
    } catch(ex){
        console.log(ex.message);
    }
}