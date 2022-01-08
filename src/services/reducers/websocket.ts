import { TWebsocketActions } from '../actions/websocket';
import {
    WS_USER_NAME_UPDATE,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
} from '../constants/websocket';

type TWebsocketState = {
    wsConnected: boolean,
    messages: ReadonlyArray<string>
}

const initialState: TWebsocketState = {
    wsConnected: false,
    messages: []
};

export const wsReducer = (state: TWebsocketState = initialState, action: TWebsocketActions) => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true
            };

        case WS_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false
            };

        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false
            };

        case WS_GET_MESSAGE:
            return {
                ...state,
                // messages: state.messages.length
                // ? [...state.messages, { action.payload, timestamp: new Date().getTime() / 1000 }]
                // : [{ action.payload, timestamp: new Date().getTime() / 1000 }]
            };

        case WS_USER_NAME_UPDATE:
            return {
                ...state,
                user: action.payload
            };

        default:
            return state;
    }
};