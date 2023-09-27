const WebSocket = require('ws');
const PORT = process.env.PORT || 10000;
const wss = new WebSocket.Server({ port: PORT });

const clients = new Set();

wss.on('connection', (ws) => {
    console.log('Cliente conectado');

    clients.add(ws);

    ws.on('message', (message) => {
        const receivedObj = JSON.parse(message);
        const resendMessage = JSON.stringify(receivedObj)
        clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(resendMessage);
            }
        });
    });

    ws.on('close', () => {
        console.log('Cliente desconectado');
        clients.delete(ws);
    });
});

wss.on('listening', () => {
    console.log('Servidor WebSocket en ejecución en el puerto 10000');
});
