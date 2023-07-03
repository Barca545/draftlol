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
var connectionClass_1 = require("./types/connectionClass");
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
    connections.map(function (connection) {
        if (connection.type === 'draft') {
            connection.socket.send(draftData);
        }
    });
}
function broadcastTimer(time) {
    var timerData = JSON.stringify(time);
    timer = timerData;
    connections.map(function (connection) {
        if (connection.type === 'timer') {
            connection.socket.send(timerData);
        }
    });
}
var handleMessage = function (message) {
    var clientData = JSON.parse(message.toString());
    if ((0, type_guards_js_1.isTimer)(clientData)) {
        broadcastTimer(clientData);
    }
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
    //stick them all in the same connections and just broadcast timer messages to all timers and draft messages to all draft types
    switch (url.componentid) {
        case 'timer': {
            var connection = new connectionClass_1.SocketConnection(ws, 'timer', (0, uuid_1.v4)());
            connections.push(connection);
            console.log("Timer: ".concat(connection.id, " connnected"));
            ws.send(timer);
            break;
        }
        case 'draft': {
            var connection = new connectionClass_1.SocketConnection(ws, 'draft', (0, uuid_1.v4)());
            connections.push(connection);
            console.log("Draft: ".concat(connection.id, " connnected"));
            ws.send(draftList);
            break;
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
/*
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser';
import {Server} from "socket.io";

dotenv.config()

const app:Express = express()
const port = process.env.SERVER_PORT || 8080
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const server = http.createServer(app)

let io = new Server()

io.on('connection', (socket)=>{
  console.log()


})

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});*/ 
