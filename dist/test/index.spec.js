"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var sinon = __importStar(require("sinon"));
var requestJsonKey_1 = require("../lib/requestJsonKey");
var verifyJsonRequest_1 = require("../lib/verifyJsonRequest");
describe("Verify Json Request", function () {
    it("Should return a middleware function", function () {
        var middlewareFn = verifyJsonRequest_1.verifyJsonRequest({ params: [] });
        chai_1.expect(middlewareFn).to.be.a("function");
    });
    it("Should return a middleware fn that calls its 'next' callback if json request is validated", function () {
        // an empty array of params should always be validated
        var middlewareFn = verifyJsonRequest_1.verifyJsonRequest({ params: [] });
        var request = { body: {} };
        var responseStatusWatcher = sinon.fake();
        var responseJsonWatcher = sinon.fake();
        var response = {
            status: function (responsestatus) {
                responseStatusWatcher();
                return this;
            },
            json: function (responsejson) {
                responseJsonWatcher();
                return this;
            },
        };
        var next = sinon.fake();
        middlewareFn(request, response, next);
        chai_1.expect(next.calledOnce).to.equal(true);
        chai_1.expect(responseStatusWatcher.calledOnce).to.equal(false);
        chai_1.expect(responseJsonWatcher.calledOnce).to.equal(false);
    });
    it("should call response.status and response.json on requests with invalid json bodies", function () {
        var middlewareFn = verifyJsonRequest_1.verifyJsonRequest({
            params: [
                {
                    errorMessage: "missing username",
                    expected: [requestJsonKey_1.JsonValue.String],
                    key: "username",
                },
            ],
        });
        var request = { body: {} };
        var responseStatusWatcher = sinon.fake();
        var responseJsonWatcher = sinon.fake();
        var response = {
            status: function (responsestatus) {
                responseStatusWatcher();
                return this;
            },
            json: function (responsejson) {
                responseJsonWatcher();
                return this;
            },
        };
        var next = sinon.fake();
        middlewareFn(request, response, next);
        chai_1.expect(next.calledOnce).to.equal(false);
        chai_1.expect(responseStatusWatcher.calledOnce).to.equal(true);
        chai_1.expect(responseJsonWatcher.calledOnce).to.equal(true);
    });
    it("Should accept requests with bodies that do match the input config", function () {
        var middlewareFn = verifyJsonRequest_1.verifyJsonRequest({
            params: [
                {
                    errorMessage: "missing username",
                    expected: [requestJsonKey_1.JsonValue.String],
                    key: "username",
                },
            ],
        });
        var request = { body: { username: "John" } };
        var responseStatusWatcher = sinon.fake();
        var responseJsonWatcher = sinon.fake();
        var response = {
            status: function (responsestatus) {
                responseStatusWatcher();
                return this;
            },
            json: function (responsejson) {
                responseJsonWatcher();
                return this;
            },
        };
        var next = sinon.fake();
        middlewareFn(request, response, next);
        chai_1.expect(next.calledOnce).to.equal(true);
        chai_1.expect(responseStatusWatcher.calledOnce).to.equal(false);
        chai_1.expect(responseJsonWatcher.calledOnce).to.equal(false);
    });
});
