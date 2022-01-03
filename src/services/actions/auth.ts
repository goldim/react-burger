import { 
    LOGIN,
    LOGOUT,
    RESET_PASSWORD,
    SAVE_PASSWORD,
    REGISTER,
    TOKEN,
    UPDATE_PROFILE,
    LOAD_PROFILE_FAILED
} from '../constants/auth';

export interface ILoginAction {
    readonly type: typeof LOGIN;
}

export interface ILogoutAction {
    readonly type: typeof LOGOUT;
}

export interface IResetPasswordAction {
    readonly type: typeof RESET_PASSWORD;
}

export interface ISavePasswordAction {
    readonly type: typeof SAVE_PASSWORD;
}

export interface IRegisterAction {
    readonly type: typeof REGISTER;
}

export interface ITokenAction {
    readonly type: typeof TOKEN;
}

export interface IUpdateProfileAction {
    readonly type: typeof UPDATE_PROFILE;
}

export interface ILoadProfileFailedAction {
    readonly type: typeof LOAD_PROFILE_FAILED;
}

export type TAuthActions = 
    | ILoginAction
    | ILogoutAction
    | IResetPasswordAction
    | ISavePasswordAction
    | IRegisterAction
    | ITokenAction
    | IUpdateProfileAction
    | ILoadProfileFailedAction
    ;