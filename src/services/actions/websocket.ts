import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE
} from '../constants/websocket';

export interface IWsConnectionStartAction {
    readonly type: typeof WS_CONNECTION_START,
    url: string
}

export const wsConnectionStart = (url: string): IWsConnectionStartAction => {
    return {
        type: WS_CONNECTION_START,
        url
    };
};


export interface IWsConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS
}

export const wsConnectionSuccess = (): IWsConnectionSuccessAction => {
    return {
        type: WS_CONNECTION_SUCCESS
    };
};

export interface IWsConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR
}

export const wsConnectionError = (): IWsConnectionErrorAction => {
    return {
        type: WS_CONNECTION_ERROR
    };
};

export interface IWsConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED
}

export const wsConnectionClosed = (): IWsConnectionClosedAction => {
    return {
        type: WS_CONNECTION_CLOSED
    };
};

export interface IWsGetMessageAction {
    readonly type: typeof WS_GET_MESSAGE,
    payload: string
}

export const wsGetMessage = (message: string): IWsGetMessageAction => {
    return {
        type: WS_GET_MESSAGE,
        payload: message
    };
};

export const wsSendMessage = (message: string) => {
    return {
        type: WS_SEND_MESSAGE,
        payload: message
    };
};

export type TWebsocketActions = 
    | IWsConnectionStartAction
    | IWsConnectionSuccessAction
    | IWsConnectionErrorAction
    | IWsConnectionClosedAction
    | IWsGetMessageAction
    ;