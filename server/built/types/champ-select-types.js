"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTimer = void 0;
function isTimer(requestBody) {
    return requestBody.seconds !== undefined;
}
exports.isTimer = isTimer;
