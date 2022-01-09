import { 
    LOGIN,
    LOGOUT,
    RESET_PASSWORD,
    SAVE_PASSWORD,
    REGISTER,
    UPDATE_PROFILE,
    LOAD_PROFILE_FAILED
} from '../constants/auth';

type TUserData = {
    name: string,
    email: string
}

type TUserDataWithTokens = TUserData & TWithTokens;

type TWithTokens = {
    accessToken: string,
    refreshToken: string
}

type TAuthData = TWithTokens & {
    user: TUserData
}

export interface ILoginAction {
    readonly type: typeof LOGIN;
    data: TAuthData
}

export const login = (data: TAuthData): ILoginAction => ({
    type: LOGIN,
    data
})

export interface ILogoutAction {
    readonly type: typeof LOGOUT;
}

export const logout = (): ILogoutAction => ({
    type: LOGOUT
})

export interface IResetPasswordAction {
    readonly type: typeof RESET_PASSWORD;
}

export const resetPassword = (): IResetPasswordAction => ({
    type: RESET_PASSWORD
})

export interface ISavePasswordAction {
    readonly type: typeof SAVE_PASSWORD;
}

export const savePassword = (): ISavePasswordAction => ({
    type: SAVE_PASSWORD
})

export interface IRegisterAction {
    readonly type: typeof REGISTER;
    data: TUserDataWithTokens
}

export const register = (data: TUserDataWithTokens): IRegisterAction => ({
    type: REGISTER,
    data
})

export interface IUpdateProfileAction {
    readonly type: typeof UPDATE_PROFILE;
    user: TUserData
}

export const updateProfile = (user: TUserData): IUpdateProfileAction => ({
    type: UPDATE_PROFILE,
    user
})

export interface ILoadProfileFailedAction {
    readonly type: typeof LOAD_PROFILE_FAILED;
}

export const loadProfileFailed = (): ILoadProfileFailedAction => ({
    type: LOAD_PROFILE_FAILED
})

export type TAuthActions = 
    | ILoginAction
    | ILogoutAction
    | IResetPasswordAction
    | ISavePasswordAction
    | IRegisterAction
    | IUpdateProfileAction
    | ILoadProfileFailedAction
    ;