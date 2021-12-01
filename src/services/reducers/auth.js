import {
    LOGIN,
    LOGOUT,
    REGISTER,
    TOKEN,
    RESET_PASSWORD,
    SAVE_PASSWORD,
    UPDATE_PROFILE,
    LOAD_PROFILE_FAILED
} from '../actions/auth'

const initialState = {
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

export const AuthReducer = (state = initialState, action) => {
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
            console.log("reducer", result2);
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
        case TOKEN:
            return state;
        default:
            return state;
    }
}