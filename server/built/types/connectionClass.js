"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketConnection = void 0;
var SocketConnection = /** @class */ (function () {
    function SocketConnection(socket, type, id) {
        this.id = id;
        this.type = type;
        this.socket = socket;
    }
    return SocketConnection;
}());
exports.SocketConnection = SocketConnection;
