"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var draftlistInitialState_js_1 = __importDefault(require("./draftlistInitialState.js"));
var uuid_1 = require("uuid");
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
///https://stackoverflow.com/questions/12192321/is-it-possible-to-send-a-data-when-a-websocket-connection-is-opened
///current issue where new draft overwrites old one if someone joins the draft captain
///can use params to tell if red or blue
///red or blue have their own param and then it splits them into different client bodies based on that 
///send only red info to red and only blue to blue
dotenv_1.default.config();
var server = (0, express_1.default)();
var PORT = process.env.SERVER_PORT || 8080;
server.get('/draftlist', function (req, res) {
    res.send(draftList);
});
server.listen(PORT, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at http://localhost:".concat(PORT));
});
console.log("server running on ".concat(PORT));
var wss = new ws_1.WebSocketServer({ port: 8080 });
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
            client.send(data);
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
