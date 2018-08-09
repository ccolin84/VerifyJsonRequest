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
  requiredParams: RequestJsonKey[],
  body: any,
): RequestConfigComparision {
  const comparison = { isValid: true, errorMessage: "" };

  requiredParams.every((requiredParam) => {
    const foundError: boolean = requiredParamNotVerified(requiredParam, body);

    if (foundError) {
      comparison.isValid = false;
      comparison.errorMessage = requiredParam.errorMessage;
    }

    return !foundError;
  });
  return comparison;
}

export function requiredParamNotVerified(
  requiredParam: RequestJsonKey,
  body: any,
): boolean {
  const { expectedType, key } = requiredParam;
  const providedValue = body[key];
  const providedValueType = typeof body[key];

  // verify a value has been provided
  if (!providedValue) {
    return true;
  } else if (expectedType.type === "value") {
    // verify it is the right type
    return expectedType.value !== providedValueType;
  } else if (expectedType.type === "object" && providedValueType === "object") {
    // verify the object passed
    return !compareRequestToConfig(expectedType.value, providedValue).isValid;
  }

  return false;
}

function sendError(response: Response, errorMessage: string): void {
  response.status(400).json({
    message: errorMessage,
    status: "fail",
  });
}
