"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matches = exports.Match = exports.SocketConnection = void 0;
var initialDraftList_1 = require("../initialStates/initialDraftList");
var type_guards_1 = require("./type-guards");
///socket connection could probably be an interface
///only reason not to do this is because I feel to lazy to refactor the code in index
var SocketConnection = /** @class */ (function () {
    function SocketConnection(socket, type, id) {
        this.id = id;
        this.type = type;
        this.socket = socket;
    }
    return SocketConnection;
}());
exports.SocketConnection = SocketConnection;
///this can either be called with a [POST] request from the create draft page or with an API [POST] call
var Match = /** @class */ (function () {
    function Match(time, id) {
        if (time === void 0) { time = 60; }
        var _this = this;
        this.addTimerConnection = function (connection) {
            if (_this.timerConnections.includes(connection) === false) {
                _this.timerConnections.push(connection);
                connection.socket.send(JSON.stringify(_this.timer));
            }
        };
        this.addDraftConnection = function (connection) {
            if (_this.draftConnections.includes(connection) === false) {
                _this.draftConnections.push(connection);
                connection.socket.send(JSON.stringify(_this.draft));
            }
        };
        this.id = id;
        this.timer = { seconds: time };
        this.draft = initialDraftList_1.initialDraftList;
        this.champList = initialDraftList_1.initialDraftList.champList; //might not need since I am not splitting out the champ list
        this.players = [];
        this.timerConnections = [];
        this.draftConnections = [];
    }
    Match.prototype.broadcastDraft = function (draftlist) {
        var draftData = JSON.stringify(draftlist);
        this.draft = draftlist;
        this.draftConnections.map(function (connection) {
            connection.socket.send(draftData);
        });
    };
    Match.prototype.broadcastTimer = function (time) {
        var timerData = JSON.stringify(time);
        this.timer = time;
        this.timerConnections.map(function (connection) {
            connection.socket.send(timerData);
        });
    };
    return Match;
}());
exports.Match = Match;
var Matches = /** @class */ (function () {
    function Matches() {
        var _this = this;
        this.updateDraft = function (id, draftList) {
            _this.list.map(function (match) {
                if (match.id === id) {
                    match.draft = draftList;
                }
            });
        };
        this.updateTimer = function (id, timer) {
            _this.list.map(function (match) {
                if (match.id === id) {
                    match.timer = timer;
                }
            });
        };
        this.handleMessage = function (message, matchid) {
            var clientData = JSON.parse(message.toString());
            console.log(clientData);
            var match = _this.findMatch(matchid);
            if ((0, type_guards_1.isTimer)(clientData)) {
                match.broadcastTimer(clientData);
                _this.updateTimer(matchid, clientData);
            }
            else if ((0, type_guards_1.isDraftlist)(clientData)) {
                match.broadcastDraft(clientData);
                _this.updateDraft(matchid, clientData);
            }
        };
        this.destroyMatch = function (id) {
            var index = _this.list.findIndex(function (match) { return match.id === id; });
            _this.list.splice(index, 1);
        };
        ///this needs to generate the new match from data given to it
        this.addMatch = function (matchid) {
            if (_this.list.find(function (match) { match.id = matchid; }) === undefined) {
                var newMatch = new Match(60, matchid);
                _this.list.push(newMatch);
                newMatch.broadcastDraft(newMatch.draft);
                newMatch.broadcastTimer(newMatch.timer);
            }
            //broadcast the match's data if it already exists
            else {
                var currentMatch = _this.list.find(function (match) { return match.id === matchid; });
                currentMatch.broadcastDraft(currentMatch.draft);
                currentMatch.broadcastTimer(currentMatch.timer);
            }
        };
        this.findMatch = function (id) {
            return (_this.list.find(function (match) { return match.id = id; }));
        };
        this.list = [];
    }
    return Matches;
}());
exports.Matches = Matches;
