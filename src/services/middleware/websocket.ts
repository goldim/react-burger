import { Middleware, MiddlewareAPI } from "redux";
import { TWebsocketActions } from "../actions/websocket";
import { WS_CLOSE, WS_CONNECTION_START, WS_SEND_MESSAGE } from "../constants/websocket";
import { AppDispatch, TRootState } from "../types";

export const websocket = (): Middleware => {
    return (store: MiddlewareAPI<AppDispatch, TRootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TWebsocketActions) => {
            const { dispatch } = store;
            if (action.type === WS_CONNECTION_START) {
                socket = new WebSocket(`${action.url}`);
                if (socket) {
                    socket.onopen = event => {
                        dispatch(action.actions.onOpen(event));
                    };

                    socket.onerror = event => {
                        if (action.actions.onError)
                            dispatch(action.actions.onError(event));
                    };

                    socket.onmessage = event => {
                        const { data } = event;
                        const parsedData = JSON.parse(data);
                        const { success, ...restParsedData } = parsedData;
    
                        dispatch(action.actions.onMessage(restParsedData));
                    };
    
                    
                    socket.onclose = event => {
                        if (action.actions.onClose)
                            dispatch(action.actions.onClose(event));
                    };
                }
            } else if (action.type === WS_SEND_MESSAGE) {
                const message = action.payload;
                if (socket)
                    socket.send(message);
            } else if (action.type === WS_CLOSE) {
                if (socket){
                    socket.close();
                }
            }
           
            next(action);
        };
    };
};