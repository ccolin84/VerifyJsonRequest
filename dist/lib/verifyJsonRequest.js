"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function verifyJsonRequest(config) {
    if (!config) {
        throw new Error("No config object provided!");
    }
    return function (request, response, next) {
        return undefined;
    };
}
exports.verifyJsonRequest = verifyJsonRequest;
