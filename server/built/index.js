"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var uuid_1 = require("uuid");
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var http_1 = __importDefault(require("http"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var connectionClass_1 = require("./types/connectionClass");
///current draftlist state updated whenever a new message comes 
/*eventuall
may need to change the scope of draftList when I make this support multiple websockets*/
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.SERVER_PORT || 8080;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
var server = http_1.default.createServer(app);
var wss = new ws_1.WebSocketServer({ server: server });
var matches = new connectionClass_1.Matches();
wss.on('connection', function (ws, req) {
    ws.on('error', console.error);
    var urlArray = req.url.split('/');
    var url = {
        matchID: urlArray[1],
        componentid: urlArray[2]
    };
    ///needs to add to the same match 
    matches.addMatch(url.matchID);
    switch (url.componentid) {
        case 'timer': {
            var connection = new connectionClass_1.SocketConnection(ws, 'timer', (0, uuid_1.v4)());
            var match = matches.findMatch(url.matchID);
            match.addTimerConnection(connection);
            console.log("Timer: ".concat(connection.id, " connnected"));
            break;
        }
        case 'draft': {
            var connection = new connectionClass_1.SocketConnection(ws, 'draft', (0, uuid_1.v4)());
            var match = matches.findMatch(url.matchID);
            match.addDraftConnection(connection);
            console.log("Draft: ".concat(connection.id, " connnected"));
            break;
        }
    }
    ws.on('message', function (messageData) {
        matches.handleMessage(messageData, url.matchID);
    });
    ws.on('close', function (event) {
        var closeCode = event.code;
    });
});
/*app.get('/draftlist', (req:Request, res:Response)=> {
  ///may have to use JSON.parse on the other end since this is now a JSON string
  res.send(draftList)
})*/
server.listen(port, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at http://localhost:".concat(port));
});
