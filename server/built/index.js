"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var initialDraftList_js_1 = require("./initialStates/initialDraftList.js");
var uuid_1 = require("uuid");
var type_guards_js_1 = require("./types/type-guards.js");
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var http_1 = __importDefault(require("http"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
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
var connections = [];
function broadcastDraft(list) {
    var draftData = JSON.stringify(list);
    draftList = draftData;
    for (var connection in connections) {
        ///console.log(connections)
    }
}
function broadcastTimer(time) {
    timer = JSON.stringify(time);
    for (var connection in connections) {
        ///console.log(connections)
    }
}
var handleMessage = function (message) {
    var clientData = JSON.parse(message.toString());
    if ((0, type_guards_js_1.isTimer)(clientData)) {
        broadcastTimer(clientData);
    }
    ///problem is this line, it is broadcasting draft every time the 
    else if ((0, type_guards_js_1.isDraftlist)(clientData)) {
        broadcastDraft(clientData);
    }
};
wss.on('connection', function (ws, req) {
    ws.on('error', console.error);
    var urlArray = req.url.split('/');
    var url = {
        matchID: urlArray[1],
        componentid: urlArray[2]
    };
    var socket = {
        ID: (0, uuid_1.v4)(),
        socket: ws
    };
    var connectionIndex = connections.findIndex(function (matchID) { return matchID.matchID === url.matchID; });
    if (connectionIndex !== -1) {
        if (url.componentid === 'timer') {
            connections[connectionIndex].timerIDs.push(socket);
            ws.send(timer);
        }
        else if (url.componentid === 'draft') {
            connections[connectionIndex].draftIDs.push(socket);
            ws.send(draftList);
        }
        else if (connectionIndex === -1) {
            console.log('else');
            if (url.componentid === 'timer') {
                var connection = {
                    matchID: url.matchID,
                    timerIDs: [socket],
                    draftIDs: [],
                };
                connections.push(connection);
                ws.send(timer);
            }
            else if (url.componentid === 'draft') {
                var connection = {
                    matchID: url.matchID,
                    timerIDs: [],
                    draftIDs: [socket],
                };
                connections.push(connection);
                ws.send(draftList);
            }
        }
    }
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
