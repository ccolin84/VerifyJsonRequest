import { JsonValue, RequestJsonKey } from "../lib";

export const singleValueParam: RequestJsonKey[] = [
  {
    errorMessage: "missing username",
    expectedType: { type: "value", value: JsonValue.String },
    key: "username",
  },
];

const objectKey: RequestJsonKey = {
  errorMessage: "missing username",
  expectedType: { type: "value", value: JsonValue.String },
  key: "username",
};

export const singleObjectParam: RequestJsonKey[] = [
  {
    errorMessage: "missing user",
    expectedType: {
      type: "object",
      value: [objectKey],
    },
    key: "user",
  },
];

export const multipleValueParams: RequestJsonKey[] = [
  {
    errorMessage: "missing username",
    expectedType: { type: "value", value: JsonValue.String },
    key: "username",
  },
  {
    errorMessage: "missing username",
    expectedType: { type: "value", value: JsonValue.String },
    key: "username",
  },
];

export const multipleObjectParams: RequestJsonKey[] = [
  {
    errorMessage: "missing user",
    expectedType: {
      type: "object",
      value: [objectKey],
    },
    key: "user",
  },
  {
    errorMessage: "missing user",
    expectedType: {
      type: "object",
      value: [objectKey],
    },
    key: "user",
  },
];

export const multipleMixedParams: RequestJsonKey[] = [
  {
    errorMessage: "missing user",
    expectedType: {
      type: "object",
      value: [objectKey],
    },
    key: "user",
  },
  {
    errorMessage: "missing username",
    expectedType: { type: "value", value: JsonValue.String },
    key: "username",
  },
];
