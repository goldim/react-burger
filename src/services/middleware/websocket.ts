import { Middleware, MiddlewareAPI } from "redux";
import { TWebsocketActions } from "../actions/websocket";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE, WS_SEND_MESSAGE } from "../constants/websocket";
import { AppDispatch, TRootState } from "../types";

// type TWebsocketActions = {
//     wsInit: WS_CONNECTION_START,
//     wsSendMessage: WS_SEND_MESSAGE,
//     onOpen: WS_CONNECTION_SUCCESS,
//     onClose: WS_CONNECTION_CLOSED,
//     onError: WS_CONNECTION_ERROR,
//     onMessage: WS_GET_MESSAGE
// }

const wsActions = {
    wsInit: WS_CONNECTION_START,
    wsSendMessage: WS_SEND_MESSAGE,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE
};

export const websocket = (): Middleware => {
    return (store: MiddlewareAPI<AppDispatch, TRootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: any) => {
            const { dispatch, getState } = store;
            const { type, payload } = action;
            const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
            const accessToken = getState().authReducer.accessToken;
            if (type === wsInit && accessToken) {
                socket = new WebSocket(`${payload.url}?token=${accessToken}`);
            } else if (type === wsInit) {
                socket = new WebSocket(`${payload.url}`);
            }

            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: onOpen, payload: event });
                };

                socket.onerror = event => {
                    dispatch({ type: onError, payload: event });
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const { success, ...restParsedData } = parsedData;

                    dispatch({ type: onMessage, payload: restParsedData });
                };

                socket.onclose = event => {
                    dispatch({ type: onClose, payload: event });
                };

                if (type === wsSendMessage) {
                    const message = { ...payload, token: accessToken };
                    socket.send(JSON.stringify(message));
                }
            }

            next(action);
        };
    };
};