import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE,
    WS_USER_NAME_UPDATE
} from '../constants/websocket';

interface wsConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS
};

interface wsConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR
};

interface wsConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED
};

interface wsGetMessageAction {
    readonly type: typeof WS_GET_MESSAGE,
    payload: string
};

interface wsSendMessageAction {
    readonly type: typeof WS_SEND_MESSAGE,
    payload: string
};

interface wsUserNameUpdateAction {
    readonly type: typeof WS_USER_NAME_UPDATE,
    payload: string
};

export type TWebsocketActions = 
    | wsConnectionSuccessAction
    | wsConnectionErrorAction
    | wsConnectionClosedAction
    | wsGetMessageAction
    | wsSendMessageAction
    | wsUserNameUpdateAction
    ;