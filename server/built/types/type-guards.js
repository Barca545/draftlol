"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isConnection = exports.isDraftlist = exports.isTimer = void 0;
function isTimer(requestBody) {
    return requestBody.seconds !== undefined;
}
exports.isTimer = isTimer;
function isDraftlist(requestBody) {
    return requestBody.blueTurn !== undefined;
}
exports.isDraftlist = isDraftlist;
function isConnection(requestBody) {
    if (requestBody !== undefined) {
        return requestBody.draftIDs !== undefined;
    }
    else {
        return (false);
    }
}
exports.isConnection = isConnection;
