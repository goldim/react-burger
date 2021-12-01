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

const fetchPatch = async (url, data, headers) => {
    return await fetch(url, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(data)
    });
}

const fetchGet = async (url, headers) => {
    return await fetch(url, {
        method: 'GET',
        headers
    });
}

export const getUserRequest = () => {
    const fetchFunc = () => fetchGet(GET_USER_URL, getCommonHeadersWithAuth());
    return fetchProcess(fetchFunc);
}

export const changeUserRequest = async (name, password, email) => {
    const fetchFunc = () => fetchPatch(GET_USER_URL, {name, password, email}, getCommonHeadersWithAuth());
    return fetchProcess(fetchFunc);
}

const fetchPost = async (url, data, headers) => {
    return await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
    });
}

const fetchProcess = async requestFunc => {
    try {
        const response = await requestFunc();
        if (response.ok){
            const json = await response.json();
            if (json.success){
                return json;
            } else {
                throw new Error(json.message);
            }
        } else {
            throw new Error("request failed");
        }
    } catch (ex){
        throw new Error(ex.message);
    }
}

const fetchData = async (url, data) => {
    const fetchFunc = () => fetchPost(url, data, getCommonHeaders());
    return await fetchProcess(fetchFunc);
}

const LOGOUT_URL = ENDPOINT_URL +  'auth/logout';

export const logoutRequest = async () => {
    return fetchData(LOGOUT_URL, {token: localStorage.getItem("refreshToken")});
}

const LOGIN_URL = ENDPOINT_URL + 'auth/login';

export const loginRequest = async (email, password) => {
    return await fetchData(LOGIN_URL, {email, password});
}

const REGISTER_URL = ENDPOINT_URL + 'auth/register';

export const registerRequest = async (name, password, email) => {
    return fetchData(REGISTER_URL, {email, password, name});
}

const RESET_PASSWORD_STEP_1_URL = ENDPOINT_URL + 'password-reset';

export const sendRecoveryCodeRequest = async email => {
    return fetchData(RESET_PASSWORD_STEP_1_URL, {email});
}

const RESET_PASSWORD_STEP_2_URL = ENDPOINT_URL + 'password-reset/reset';

export const resetPasswordRequest = async (password, token) => {
    return fetchData(RESET_PASSWORD_STEP_2_URL, {password, token});
}
