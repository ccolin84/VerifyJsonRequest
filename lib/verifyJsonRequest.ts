import { Config } from "./config";
import { Middleware, Next, Request, Response } from "./middleware";
import { ObjectType, RequestJsonKey, ValueType } from "./requestJsonKey";

interface RequestConfigComparision {
  isValid: boolean;
  errorMessage: string;
}

export function verifyJsonRequest(config: Config): Middleware {
  if (!config) {
    throw new Error("No config object provided!");
  }
  return (request: Request, response: Response, next: Next): void => {
    const { isValid, errorMessage } = compareRequestToConfig(
      config.params,
      request.body,
    );
    if (!isValid) {
      sendError(response, errorMessage);
    } else {
      next();
    }
  };
}

export function compareRequestToConfig(
  params: RequestJsonKey[],
  body: any,
): RequestConfigComparision {
  const comparison = { isValid: true, errorMessage: "" };
  params.every(({ key, errorMessage, expectedType }) => {
    let foundError: boolean = false;
    const bodyKeyValue = body[key];
    const bodyKeyType = typeof body[key];

    if (!bodyKeyValue) {
      foundError = true;
    } else if (expectedType.type === "value") {
      foundError = expectedType.value !== bodyKeyType;
    } else if (expectedType.type === "object" && bodyKeyType === "object") {
      foundError = !compareRequestToConfig(expectedType.value, bodyKeyValue)
        .isValid;
    }

    if (foundError) {
      comparison.isValid = false;
      comparison.errorMessage = errorMessage;
    }

    return !foundError;
  });
  return comparison;
}

function sendError(response: Response, errorMessage: string): void {
  response.status(400).json({
    message: errorMessage,
    status: "fail",
  });
}
