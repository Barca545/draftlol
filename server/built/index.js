"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var draftlistInitialState_js_1 = require("./draftlistInitialState.js");
var uuid_1 = require("uuid");
var port_js_1 = require("./port.js");
///Whenever a new client connects they need to be sent the current draftlist
///figure out why ws.send() does not work inside 
///https://stackoverflow.com/questions/12192321/is-it-possible-to-send-a-data-when-a-websocket-connection-is-opened
///currently the incomplete redDraft page is causing wonky things with bans so fix that and see if it persists
///shows the bans as red bans but for some reason the most recent one toggles on and off
///if i had to guess this is partially caused by the let draftList being wrong
///current issue where new draft overwrites old one if someone joins the draft captain
///can use params to tell if red or blue
///red or blue have their own param and then it splits them into different client bodies based on that 
///send only red info to red and only blue to blue
console.log("server running on ".concat(port_js_1.PORT));
var wss = new ws_1.WebSocketServer({ port: port_js_1.PORT });
var clients = {};
///current draftlist state updated whenever a new message comes 
var draftList = JSON.stringify(draftlistInitialState_js_1.default);
///obviously have to confirm the logic here is what I want since I just copied it from the tutorial
function broadcastMessage(DraftList) {
    var data = JSON.stringify(DraftList);
    draftList = data;
    for (var clientId in clients) {
        var client = clients[clientId];
        if (client.readyState === ws_1.WebSocket.OPEN) {
            ///send queues information which explains why it isn't sending until the next message
            console.log('sending');
            client.send(data);
            ///console.log(draftList)
        }
    }
}
var handleMessage = function (message) {
    var clientData = JSON.parse(message.toString());
    broadcastMessage(clientData);
};
wss.on('connection', function (ws, req) {
    ws.on('error', console.error);
    ///can use this to separate sides 
    //const url = new URL(req.url, `http://${req.headers.host}`);
    ///console.log(url)
    ///send the draftList here
    ws.send(draftList);
    ///when the connection is established it needs to note which ID belongs to which side
    var clientId = (0, uuid_1.v4)();
    clients[clientId] = ws;
    console.log("User ".concat(clientId, " connected"));
    ws.on('message', function (message) {
        handleMessage(message);
    });
    ws.on('close', function (event) {
        var closeCode = event.code;
        console.log('close code');
        console.log(closeCode);
    });
});
