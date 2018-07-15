import { expect } from "chai";
import "mocha";
import * as sinon from "sinon";

import { Next, Request, Response } from "../lib/middleware";
import { JsonValue } from "../lib/requestJsonKey";
import { verifyJsonRequest } from "../lib/verifyJsonRequest";

describe("Verify Json Request", function() {
  it("Should return a middleware function", function() {
    const middlewareFn = verifyJsonRequest({ params: [] });
    expect(middlewareFn).to.be.a("function");
  });

  it("Should return a middleware fn that calls its 'next' callback if json request is validated", function() {
    // an empty array of params should always be validated
    const middlewareFn = verifyJsonRequest({ params: [] });
    const request = { body: {} };
    const responseStatusWatcher = sinon.fake();
    const responseJsonWatcher = sinon.fake();
    const response: Response = {
      status(responsestatus) {
        responseStatusWatcher();
        return this;
      },
      json(responsejson) {
        responseJsonWatcher();
        return this;
      },
    };
    const next = sinon.fake();
    middlewareFn(request, response, next);
    expect(next.calledOnce).to.equal(true);
    expect(responseStatusWatcher.calledOnce).to.equal(false);
    expect(responseJsonWatcher.calledOnce).to.equal(false);
  });

  it("should call response.status and response.json on requests with invalid json bodies", function() {
    const middlewareFn = verifyJsonRequest({
      params: [
        {
          errorMessage: "missing username",
          expected: [JsonValue.String],
          key: "username",
        },
      ],
    });
    const request = { body: {} };
    const responseStatusWatcher = sinon.fake();
    const responseJsonWatcher = sinon.fake();
    const response: Response = {
      status(responsestatus) {
        responseStatusWatcher();
        return this;
      },
      json(responsejson) {
        responseJsonWatcher();
        return this;
      },
    };
    const next = sinon.fake();
    middlewareFn(request, response, next);
    expect(next.calledOnce).to.equal(false);
    expect(responseStatusWatcher.calledOnce).to.equal(true);
    expect(responseJsonWatcher.calledOnce).to.equal(true);
  });

  it("Should accept requests with bodies that do match the input config", function() {
    const middlewareFn = verifyJsonRequest({
      params: [
        {
          errorMessage: "missing username",
          expected: [JsonValue.String],
          key: "username",
        },
      ],
    });
    const request = { body: { username: "John" } };
    const responseStatusWatcher = sinon.fake();
    const responseJsonWatcher = sinon.fake();
    const response: Response = {
      status(responsestatus) {
        responseStatusWatcher();
        return this;
      },
      json(responsejson) {
        responseJsonWatcher();
        return this;
      },
    };
    const next = sinon.fake();
    middlewareFn(request, response, next);
    expect(next.calledOnce).to.equal(true);
    expect(responseStatusWatcher.calledOnce).to.equal(false);
    expect(responseJsonWatcher.calledOnce).to.equal(false);
  });
});
