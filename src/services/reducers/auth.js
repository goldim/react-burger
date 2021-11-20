import {
    LOGIN,
    LOGOUT,
    REGISTER,
    TOKEN,
    RESET_PASSWORD,
    SAVE_PASSWORD,
    UPDATE_PROFILE
} from '../actions/auth'

const initialState = {
    currentUser: {
        name: "",
        email: "",
        password: ""
    },
    accessToken: "",
    refreshToken: "",
    resetSuccess: false,
    savePasswordSuccess: false
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
            };
        case LOGOUT:
            return {
                ...initialState
            };
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
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    name: action.user.name,
                    email: action.user.email,
                    password: action.user.password
                }
            };
        case TOKEN:
            return state;
        default:
            return state;
    }
}