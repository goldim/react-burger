import Cookies from 'js-cookie'

const ENDPOINT_URL = 'https://norma.nomoreparties.space/api/';
const GET_USER_URL = ENDPOINT_URL + 'auth/user';

type THeaders = Record<string, string>;
type TData = Record<string, string | null>;
type TFetchFunc = () => Promise<Response>;

const getCommonHeaders = (): THeaders => ({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
})

const getCommonHeadersWithAuth = (): THeaders => { 
    const accessToken = Cookies.get('accessToken');
    return ({
        ...getCommonHeaders(),
        'Authorization': accessToken ? accessToken: ""
    })
};

const fetchPatch = async (url: string, data: TData, headers: THeaders) => {
    return await fetch(url, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(data)
    });
}

const fetchGet = async (url: string, headers: THeaders) => {
    return await fetch(url, {
        method: 'GET',
        headers
    });
}

export const getUserRequest = () => {
    const fetchFunc = () => fetchGet(GET_USER_URL, getCommonHeadersWithAuth());
    return fetchProcess(fetchFunc);
}

export const changeUserRequest = async (name: string, password: string, email: string) => {
    const fetchFunc = () => fetchPatch(GET_USER_URL, {name, password, email}, getCommonHeadersWithAuth());
    return fetchProcess(fetchFunc);
}

const fetchPost = async (url: string, data: TData, headers: THeaders) => {
    return await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
    });
}

const fetchProcess = async (requestFunc: TFetchFunc) => {
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
}

const fetchData = async (url: string, data: TData) => {
    const fetchFunc = () => fetchPost(url, data, getCommonHeaders());
    return await fetchProcess(fetchFunc);
}

const LOGOUT_URL = ENDPOINT_URL +  'auth/logout';

export const logoutRequest = async () => {
    return fetchData(LOGOUT_URL, {token: localStorage.getItem("refreshToken")});
}

const LOGIN_URL = ENDPOINT_URL + 'auth/login';

export const loginRequest = async (email: string, password: string) => {
    return await fetchData(LOGIN_URL, {email, password});
}

const REGISTER_URL = ENDPOINT_URL + 'auth/register';

export const registerRequest = async (name: string, password: string, email: string) => {
    return fetchData(REGISTER_URL, {email, password, name});
}

const RESET_PASSWORD_STEP_1_URL = ENDPOINT_URL + 'password-reset';

export const sendRecoveryCodeRequest = async (email: string) => {
    return fetchData(RESET_PASSWORD_STEP_1_URL, {email});
}

const RESET_PASSWORD_STEP_2_URL = ENDPOINT_URL + 'password-reset/reset';

export const resetPasswordRequest = async (password: string, token: string) => {
    return fetchData(RESET_PASSWORD_STEP_2_URL, {password, token});
}
