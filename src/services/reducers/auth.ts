import { TAuthActions } from '../actions/auth'

import {
    LOGIN,
    LOGOUT,
    REGISTER,
    RESET_PASSWORD,
    SAVE_PASSWORD,
    UPDATE_PROFILE,
    LOAD_PROFILE_FAILED
} from '../constants/auth'

type TCurrentUserSubState = {
    name: string,
    email: string,
    password: string,
    loaded: boolean
}

type TAuthState = {
    currentUser: TCurrentUserSubState,
    accessToken: string,
    refreshToken: string,
    resetSuccess: boolean,
    savePasswordSuccess: boolean,
    logoutSuccess: boolean
}

const initialState: TAuthState = {
    currentUser: {
        loaded: false,
        name: "",
        email: "",
        password: ""
    },
    accessToken: "",
    refreshToken: "",
    resetSuccess: false,
    savePasswordSuccess: false,
    logoutSuccess: false
}

export const AuthReducer = (state = initialState, action: TAuthActions) => {
    switch (action.type){
        case LOGIN:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    name: action.data.user.name,
                    email: action.data.user.email,
                },
                accessToken: action.data.accessToken,
                refreshToken: action.data.refreshToken
                // logoutSuccess: false
            };
        case LOGOUT:
            const result2 = {
                ...initialState,
                logoutSuccess: true
            };
            return result2;
        case RESET_PASSWORD:
            return {
                ...state,
                resetSuccess: true
            };
        case SAVE_PASSWORD:
            return {
                ...state,
                resetSuccess: false,
                savePasswordSuccess: true
            };
        case REGISTER:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    name: action.data.name,
                    email: action.data.email,
                },
                accessToken: action.data.accessToken,
                refreshToken: action.data.refreshToken
            };
        case UPDATE_PROFILE:
            const newstate = {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    loaded: true,
                    name: action.user.name,
                    email: action.user.email
                }
            };
            return newstate;
        case LOAD_PROFILE_FAILED:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    loaded: true
                }
            };
        default:
            return state;
    }
}