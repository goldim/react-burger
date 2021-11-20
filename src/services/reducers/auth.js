import {
    LOGIN,
    LOGOUT,
    REGISTER,
    TOKEN,
    RESET_PASSWORD
} from '../actions/auth'

const initialState = {
    accessToken: "",
    refreshToken: "",
    resetSuccess: false
}

export const AuthReducer = (state = initialState, action) => {
    switch (action.type){
        case LOGIN:
            return state;
        case LOGOUT:
            return state;
        case RESET_PASSWORD:
            console.log("reset", state);
            return {
                ...state,
                resetSuccess: true
            };
        case REGISTER:
            return state;
        case TOKEN:
            return state;
        default:
            return state;
    }
}