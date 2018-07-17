import { expect } from "chai";
import "mocha";
import * as sinon from "sinon";

import {
  compareRequestToConfig,
  JsonValue,
  Next,
  Request,
  Response,
  verifyJsonRequest,
} from "../lib";

import {
  multipleMixedParams,
  multipleObjectParams,
  multipleValueParams,
  singleObjectParam,
  singleValueParam,
} from "./mocks";

describe("Compare Request To Config", function() {
  it("not implimented");
});

describe("Verify Json Request", function() {
  let request: Request;
  let response: Response;
  let responseStatusWatcher: sinon.SinonSpy;
  let responseJsonWatcher: sinon.SinonSpy;
  let next: sinon.SinonSpy;

  beforeEach(function() {
    request = { body: {} };
    responseStatusWatcher = sinon.fake();
    responseJsonWatcher = sinon.fake();
    response = {
      status(responseStatus) {
        responseStatusWatcher(responseStatus);
        return this;
      },
      json(responseJson) {
        responseJsonWatcher(responseJson);
        return this;
      },
    };
    next = sinon.fake();
  });

  it("Should return a middleware function", function() {
    const middlewareFn = verifyJsonRequest({ params: [] });
    expect(middlewareFn).to.be.a("function");
  });

  it("Should call its 'next' callback if json request is validated", function() {
    // an empty array of params should always be validated
    const middlewareFn = verifyJsonRequest({ params: [] });
    middlewareFn(request, response, next);
    expect(next.calledOnce).to.equal(true);
    expect(responseStatusWatcher.calledOnce).to.equal(false);
    expect(responseJsonWatcher.calledOnce).to.equal(false);
  });

  it("Should not call its 'next' callback if json request is invalidated", function() {
    // any empty body will should fail a non empty array of rules
    const middlewareFn = verifyJsonRequest({
      params: singleValueParam,
    });
    middlewareFn(request, response, next);
    expect(next.calledOnce).to.equal(false);
    expect(responseStatusWatcher.calledOnce).to.equal(true);
    expect(responseJsonWatcher.calledOnce).to.equal(true);
  });

  it("should call response.status and response.json on invalid requests", function() {
    // an empty array of params should always be validated
    const middlewareFn = verifyJsonRequest({
      params: singleValueParam,
    });
    middlewareFn(request, response, next);
    expect(next.calledOnce).to.equal(false);
    expect(responseStatusWatcher.calledOnceWithExactly(400)).to.equal(true);
    expect(
      responseJsonWatcher.calledOnceWithExactly({
        message: "missing username",
        status: "fail",
      }),
    ).to.equal(true);
  });

  it("Should accept requests with single value bodies that match the input config", function() {
    const middlewareFn = verifyJsonRequest({
      params: singleValueParam,
    });
    request = { body: { username: "John" } };
    middlewareFn(request, response, next);
    expect(next.calledOnce).to.equal(true);
    expect(responseStatusWatcher.calledOnce).to.equal(false);
    expect(responseJsonWatcher.calledOnce).to.equal(false);
  });

  it("Should accept requests with single object bodies that match the input config", function() {
    const middlewareFn = verifyJsonRequest({
      params: singleObjectParam,
    });
    request = { body: { username: "John" } };
    middlewareFn(request, response, next);
    expect(next.calledOnce).to.equal(true);
    expect(responseStatusWatcher.calledOnce).to.equal(false);
    expect(responseJsonWatcher.calledOnce).to.equal(false);
  });
});
