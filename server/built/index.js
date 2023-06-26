"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var uuid_1 = require("uuid");
var port_js_1 = require("./port.js");
///Whenever a new client connects they need to be sent the current draftlist
///figure out why ws.send() does not work inside 
///https://stackoverflow.com/questions/12192321/is-it-possible-to-send-a-data-when-a-websocket-connection-is-opened
console.log("server running on ".concat(port_js_1.PORT));
var wss = new ws_1.WebSocketServer({ port: port_js_1.PORT });
var clients = {};
///current draftlist state updated whenever a new message comes 
var draftList = null;
///obviously have to confirm the logic here is what I want since I just copied it from the tutorial
function broadcastMessage(DraftList) {
    var data = JSON.stringify(DraftList);
    draftList = data;
    for (var clientId in clients) {
        var client = clients[clientId];
        if (client.readyState === ws_1.WebSocket.OPEN) {
            client.send(data);
            console.log(draftList);
        }
    }
}
var handleMessage = function (message) {
    var clientData = JSON.parse(message.toString());
    ///console.log(clientData)
    broadcastMessage(clientData);
};
wss.on('connection', function (ws) {
    ws.on('error', console.error);
    ///when the connection is established it needs to note which ID belongs to which side
    var clientId = (0, uuid_1.v4)();
    clients[clientId] = ws;
    console.log("User ".concat(clientId, " connected"));
    ws.on('message', function (message) {
        handleMessage(message);
    });
    ws.on('close', function (event) {
        var closeCode = event.code;
        console.log(closeCode);
        ///on connection send the draftlist
        ws.on('open', function open() {
            ws.send(draftList);
        });
    });
});
