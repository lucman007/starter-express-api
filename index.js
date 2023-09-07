const WebSocket = require('ws');
const PORT = process.env.PORT || 10000;
const wss = new WebSocket.Server({ port: PORT });

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
    console.log('Servidor WebSocket en ejecución en el puerto 10000');
});
