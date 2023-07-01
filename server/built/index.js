"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var initialDraftList_js_1 = require("./initialStates/initialDraftList.js");
var uuid_1 = require("uuid");
var champ_select_types_js_1 = require("./types/champ-select-types.js");
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var http_1 = __importDefault(require("http"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var promises_1 = require("timers/promises");
///current draftlist state updated whenever a new message comes 
/*eventuall
may need to change the scope of draftList when I make this support multiple websockets*/
var draftList = JSON.stringify(initialDraftList_js_1.initialDraftList);
var timer = JSON.stringify({ seconds: 60 });
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.SERVER_PORT || 8080;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
var server = http_1.default.createServer(app);
var wss = new ws_1.WebSocketServer({ server: server });
var clients = {};
function broadcastDraft(list) {
    var draftData = JSON.stringify(list);
    draftList = draftData;
    for (var clientId in clients) {
        var client = clients[clientId];
        if (client.readyState === ws_1.WebSocket.OPEN) {
            client.send(draftData);
        }
    }
}
function broadcastTimer(time) {
    timer = JSON.stringify(time);
    for (var clientId in clients) {
        var client = clients[clientId];
        if (client.readyState === ws_1.WebSocket.OPEN) {
            if (time.seconds === 60) {
                (0, promises_1.setTimeout)(client.send(timer), 5000000);
            }
            else {
                client.send(timer);
            }
        }
    }
}
var handleMessage = function (message) {
    var clientData = JSON.parse(message.toString());
    if ((0, champ_select_types_js_1.isTimer)(clientData)) {
        broadcastTimer(clientData);
    }
    else {
        broadcastDraft(clientData);
    }
};
wss.on('connection', function (ws, req) {
    ws.on('error', console.error);
    ws.send(draftList);
    ws.send(timer);
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
    ///may have to use JSON.parse on the other end since this is now a JSON string
    res.send(draftList);
});
server.listen(port, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at http://localhost:".concat(port));
});
