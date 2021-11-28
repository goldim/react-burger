import { getCookie } from "./cookies";

const ENDPOINT_URL = 'https://norma.nomoreparties.space/api/';
const GET_USER_URL = ENDPOINT_URL + 'auth/user';

const getCommonHeaders = () => ({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
})

const getCommonHeadersWithAuth = () => ({
    ...getCommonHeaders(),
    'Authorization': getCookie('accessToken')
})

export const getUserRequest = async () => {
  return fetch(GET_USER_URL, {
        method: 'GET',
        headers: getCommonHeadersWithAuth()
    })
}

export const changeUserRequest = async (name, password, email) => {
    return fetch(GET_USER_URL, {
          method: 'PATCH',
          headers: getCommonHeadersWithAuth(),
          body: JSON.stringify({name, password, email})
      })
}

const fetchPostInternal = (url, data) => {
    return fetch(url, {
        method: 'POST',
        headers: getCommonHeaders(),
        body: JSON.stringify(data)
    });
}

const LOGOUT_URL = ENDPOINT_URL +  'auth/logout';

export const logoutRequest = async () => {
    return fetchPostInternal(LOGOUT_URL, {token: localStorage.getItem("refreshToken")});
}

const LOGIN_URL = ENDPOINT_URL + 'auth/login';

export const loginRequest = async (email, password) => {
    return fetchPostInternal(LOGIN_URL, {email, password});
}

const REGISTER_URL = ENDPOINT_URL + 'auth/register';

export const registerRequest = async (name, password, email) => {
    return fetchPostInternal(REGISTER_URL, {email, password, name});
}

const RESET_PASSWORD_STEP_1_URL = ENDPOINT_URL + 'password-reset';

export const sendRecoveryCodeRequest = async email => {
    return fetchPostInternal(RESET_PASSWORD_STEP_1_URL, {email});
}

const RESET_PASSWORD_STEP_2_URL = ENDPOINT_URL + 'password-reset/reset';

export const resetPasswordRequest = async (password, token) => {
    return fetchPostInternal(RESET_PASSWORD_STEP_2_URL, {password, token});
}
