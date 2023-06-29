"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var initialDraftList_js_1 = require("./initialStates/initialDraftList.js");
var uuid_1 = require("uuid");
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var http_1 = __importDefault(require("http"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
///https://stackoverflow.com/questions/12192321/is-it-possible-to-send-a-data-when-a-websocket-connection-is-opened
///current issue where new draft overwrites old one if someone joins the draft captain
///need to add an api to get the draft at the end
///need to attach the summoner roles to the draftlist JSON
///each new match needs to spin up a new server instance
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.SERVER_PORT || 8080;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
var server = http_1.default.createServer(app);
///current draftlist state updated whenever a new message comes 
var draftListstring = JSON.stringify(initialDraftList_js_1.initialDraftList);
var draftList = initialDraftList_js_1.initialDraftList;
var wss = new ws_1.WebSocketServer({ server: server });
var clients = {};
///obviously have to confirm the logic here is what I want since I just copied it from the tutorial
function broadcastMessage(DraftList) {
    var draftData = JSON.stringify(DraftList);
    draftListstring = draftData;
    for (var clientId in clients) {
        var client = clients[clientId];
        if (client.readyState === ws_1.WebSocket.OPEN) {
            ///send queues information which explains why it isn't sending until the next message
            client.send(draftData);
        }
    }
}
var handleMessage = function (message) {
    var clientData = JSON.parse(message.toString());
    ///eventuall I think I need to change the scope of draftList when I make this support multiple websockets
    draftList = clientData;
    broadcastMessage(clientData);
};
wss.on('connection', function (ws, req) {
    ws.on('error', console.error);
    ///send the draftList here
    ws.send(draftListstring);
    ///when the connection is established it needs to note which ID belongs to which side
    var clientId = (0, uuid_1.v4)();
    clients[clientId] = ws;
    console.log("User ".concat(clientId, " connected"));
    ws.on('message', function (message) {
        handleMessage(message);
    });
    ws.on('close', function (event) {
        var closeCode = event.code;
    });
});
///api endpoints would like to put them in a different folder at some point 
app.get('/draftlist', function (req, res) {
    res.send(draftList);
});
server.listen(port, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at http://localhost:".concat(port));
});
