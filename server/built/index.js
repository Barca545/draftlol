"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var uuid_1 = require("uuid");
var PORT = 8080;
console.log("server running on ".concat(PORT));
var wss = new ws_1.WebSocketServer({ port: PORT });
var clients = {};
///obviously have to confirm the logic here is what I want since I just copied it from the tutorial
function broadcastMessage(json) {
    ///I am not 100% positive the data comes in the form of a jSON
    var data = JSON.stringify(json);
    ///this sends the same info to all clients I want to only send it to the other 2
    ///also want to make it so it flags the type of data being sent as red or blue
    for (var userId in clients) {
        var client = clients[userId];
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
            console.log(data);
        }
    }
}
var handleMessage = function (message) {
    var clientData = JSON.parse(message);
    ///OK so the message needs to say who to send it to
    console.log(clientData);
    ///broadcastMessage(clientData)
};
wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
    ///when the connection is established it needs to note which ID belongs to which side
    var clientId = (0, uuid_1.v4)();
    clients[clientId] = connection;
    console.log("User ".concat(clientId, " connected"));
    ///this might be redundant but it does confirm the server is getting the data
    ws.on('message', function (data) {
        handleMessage(data);
    });
});
