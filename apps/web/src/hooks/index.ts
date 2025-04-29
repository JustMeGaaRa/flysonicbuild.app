import { useCallback, useEffect, useRef } from "react";

type WebsocketCallbacks = {
    onConnected?: (event: Event) => void;
    onMessage?: (event: MessageEvent) => void;
    onError?: (event: Event) => void;
    onDisconnect?: (event: CloseEvent) => void;
};

type WebsocketOptions = {
    retryDelay?: number;
    maxRetries?: number;
};

export const useWebsocket = (
    url: string,
    callbacks: WebsocketCallbacks,
    options: WebsocketOptions = { maxRetries: 5, retryDelay: 3000 }
) => {
    const websocket = useRef<WebSocket | null>(null);
    const retries = useRef(0);
    const retryTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

    const { onConnected, onDisconnect, onError, onMessage } = callbacks;

    const websocketReconnect = useCallback(() => {
        if (websocket.current) {
            websocket.current.close();
        }

        websocket.current = new WebSocket(url);
        websocket.current.onopen = (event: Event) => {
            console.log("WebSocket connection established.");
            retries.current = 0;
            onConnected?.(event);
        };
        websocket.current.onmessage = (event: MessageEvent) => {
            console.log("WebSocket message received:", event.data);
            onMessage?.(event);
        };
        websocket.current.onerror = (event: Event) => {
            console.error("WebSocket error:", event);
            onError?.(event);
        };
        websocket.current.onclose = (event: CloseEvent) => {
            console.log(
                `WebSocket connection closed: wasClean=${event.wasClean}, code=${event.code}, reason=${event.reason}`
            );
            const maxRetriesReached =
                options.maxRetries && retries.current >= options.maxRetries;
            if (!event.wasClean && !maxRetriesReached) {
                retries.current++;
                retryTimeout.current = setTimeout(
                    websocketReconnect,
                    options.retryDelay
                );
            }

            onDisconnect?.(event);
        };
    }, [
        onConnected,
        onMessage,
        onError,
        onDisconnect,
        options.maxRetries,
        options.retryDelay,
        url,
    ]);
    useEffect(() => {
        console.log("Connecting to WebSocket server...");
        websocketReconnect();

        return () => {
            console.log("Cleaning up WebSocket connection...");
            clearTimeout(retryTimeout.current);
            websocket.current?.close();
            websocket.current = null;
        };
    }, [url, websocketReconnect]);

    return {
        websocket,
        websocketReconnect,
    };
};
