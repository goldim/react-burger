import { TWebsocketActions } from "../actions/websocket";
import { TRootState } from "../types";

export const websocket = (wsUrl: string, wsActions: any) => {
    return (store: TRootState) => {
        let socket: WebSocket | null = null;

        return (next: any) => (action: TWebsocketActions) => {
            const { dispatch, getState } = store as any;
            const { type, payload } = action as any;
            const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
            const { user } = getState().user;
            if (type === wsInit && user) {
                socket = new WebSocket(`${wsUrl}?token=${user.token}`);
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
                    const message = { ...payload, token: user.token };
                    socket.send(JSON.stringify(message));
                }
            }

            next(action);
        };
    };
};