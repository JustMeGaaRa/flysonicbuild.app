export const createWebsocketHandler = (callbacks: {
    onOpen?: (socket: WebSocket, event: Event) => void;
    onMessage?: (socket: WebSocket, event: MessageEvent) => void;
    onError?: (socket: WebSocket, error: Event) => void;
    onClose?: (socket: WebSocket, event: CloseEvent) => void;
}) => {
    const clients = new Set<WebSocket>();
    const { onOpen, onClose, onError, onMessage } = callbacks;

    const handler = function acceptWebsocketConnection(request: Request) {
        console.log("Accepted client request...");
        // If the request is a websocket upgrade,
        // we need to use the Deno.upgradeWebSocket helper
        if (request.headers.get("upgrade") === "websocket") {
            const { socket, response } = Deno.upgradeWebSocket(request);
            console.log("WebSocket connection accepted.");

            clients.add(socket);

            socket.onopen = (event: Event) => {
                console.log("WebSocket connection established.");
                onOpen?.(socket, event);
            };
            socket.onmessage = (event: MessageEvent) => {
                console.log("WebSocket message received.");
                onMessage?.(socket, event);
            };
            socket.onclose = (event: CloseEvent) => {
                console.log(
                    `WebSocket connection closed: wasClean=${event.wasClean}, code=${event.code}, reason=${event.reason}`
                );
                clients.delete(socket);
                onClose?.(socket, event);
            };
            socket.onerror = (error: Event) => {
                console.error(
                    error instanceof Error ? error.message : "Unknown error"
                );
                onError?.(socket, error);
            };

            return response;
        } else {
            return new Response("Not Implemented", {
                status: 501,
                headers: { "content-type": "text/plain" },
            });
        }
    };

    return {
        clients,
        handler,
    };
};
