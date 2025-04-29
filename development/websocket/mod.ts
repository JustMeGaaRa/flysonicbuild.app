function main() {
    const wsUri = "ws://127.0.0.1:7000/";
    const websocket = new WebSocket(wsUri);

    websocket.onopen = (event) => {
        console.log(`CONNECTED: ${event}`);
    };

    websocket.onclose = (event) => {
        console.log(`DISCONNECTED: ${event}`);
    };

    websocket.onmessage = (event) => {
        console.log(`RECEIVED: ${event.data}`);
    };

    websocket.onerror = (error) => {
        console.log(`ERROR: ${error}`);
    };
}

if (import.meta.main) {
    main();
}
