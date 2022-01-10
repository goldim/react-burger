import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE,
    WS_CLOSE
} from '../constants/websocket';
import { IServerOrderReply } from '../types/order';
import { INewOrderCameAction, IStartFetchingOrdersAction } from './order';

export type TActions = {
    onOpen: ((payload: Event) => IWsConnectionStartAction) | (() => IStartFetchingOrdersAction),
    onClose?: ((payload: Event) => IWsConnectionClosedAction),
    onError?: ((payload: Event) => IWsConnectionErrorAction),
    onMessage: (payload: IServerOrderReply) => INewOrderCameAction
};

export interface IWsConnectionStartAction {
    readonly type: typeof WS_CONNECTION_START,
    url: string,
    actions: TActions
}

export const wsConnectionStart = (url: string, actions: TActions): IWsConnectionStartAction => {
    return {
        type: WS_CONNECTION_START,
        url,
        actions
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
        type: WS_CONNECTION_CLOSED,
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

export interface IWsSendMessageAction {
    readonly type: typeof WS_SEND_MESSAGE,
    payload: string
}

export const wsSendMessage = (message: string) => {
    return {
        type: WS_SEND_MESSAGE,
        payload: message
    };
};

export interface IWsCloseAction {
    readonly type: typeof WS_CLOSE
}

export const wsClose = () => {
    return {
        type: WS_CLOSE
    };
};

export type TWebsocketActions = 
    | IWsConnectionStartAction
    | IWsConnectionSuccessAction
    | IWsConnectionErrorAction
    | IWsConnectionClosedAction
    | IWsGetMessageAction
    | IWsSendMessageAction
    | IWsCloseAction
    ;