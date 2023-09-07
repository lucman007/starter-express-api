const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', (ws) => {
    console.log('Cliente conectado');
    ws.on('message', (message) => {
        const messageText = message.toString();
        ws.send(messageText);
    });
    ws.on('close', () => {
        console.log('Cliente desconectado');
    });
});

wss.on('listening', () => {
    console.log('Servidor WebSocket en ejecución en el puerto 3000');
});
